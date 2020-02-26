/*
 * @poppinss/cookie
 *
 * (c) Harminder Virk <virk@adonisjs.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import ms from 'ms'
import bourne from '@hapi/bourne'
import cookieSignature from 'cookie-signature'
import cookie, { CookieSerializeOptions } from 'cookie'

export type CookieOptions = {
  domain: string,
  expires: Date | (() => Date),
  httpOnly: boolean,
  maxAge: number | string,
  path: string,
  sameSite: boolean | 'lax' | 'none' | 'strict',
  secure: boolean,
}

/**
 * Pack a value to be saved as a cookie string. If `secretKey` is
 * defined, then cookie will be signed to avoid client side
 * tampering.
 *
 * When setting the cookie header, it is recommended to [[serialize]] method
 * instead.
 *
 * @example
 * ```ts
 * pack('hello world', 'a-long-secret-to-sign-cookie')
 * pack({ hello: 'world' }, 'a-long-secret-to-sign-cookie')
 * ```
 */
export function pack (value: any, secretKey?: string): null | string {
  if (value === undefined || value === null) {
    return null
  }

  if (value instanceof Date) {
    value = value.toJSON()
  } else if (typeof (value) !== 'string') {
    value = `j:${JSON.stringify(value)}`
  }

  /**
   * If secret is defined, then sign the cookie
   */
  if (secretKey) {
    return `s:${cookieSignature.sign(value, secretKey)}`
  }

  return value
}

/**
 * Unpack, previously packed cookie value. If cookie was signed and `secretKey` is
 * not passed to this method, then the signed value will be returned as a plain
 * cookie.
 *
 * @example
 * ```ts
 * const packed = pack('hello world', 'a-long-secret-to-sign-cookie')
 * unpack(packed, 'a-long-secret-to-sign-cookie') // hello-world
 * ```
 */
export function unpack (value: string, secretKey?: string): null | { value: any, signed: boolean } {
  let signed = false

  let parsedValue: boolean | string = value

  /**
   * Unsign signed cookie values. The cookie builder
   * prepends `s:` in front of signed cookies
   */
  if (parsedValue.substr(0, 2) === 's:' && secretKey) {
    signed = true
    parsedValue = cookieSignature.unsign(parsedValue.slice(2), secretKey)
  }

  /**
   * Return early when unable to unsign cookie
   */
  if (!parsedValue) {
    return null
  }

  /**
   * Parse JSON cookies using `bourne.parse`. The cookie builder
   * prepends `j:` to non string values. We use bourne instead of native
   * JSON.parse to avoid prototype poising. Read this
   * https://medium.com/intrinsic/javascript-prototype-poisoning-vulnerabilities-in-the-wild-7bc15347c96
   */
  if (parsedValue.substr(0, 2) === 'j:') {
    try {
      return {
        value: bourne.parse(parsedValue.slice(2), { protoAction: 'remove' }),
        signed,
      }
    } catch (error) {
      return null
    }
  }

  return { value: parsedValue, signed }
}

/**
 * Parse cookie header and return an object of cookies as `key/value` pair. The
 * output of this method has two top level objects explained below:
 *
 * ## Signed cookies
 * An object of cookies that are successfully verified and not being tampered.
 *
 * ## Plain cookies
 * An object of cookies that were not signed initially via [[serialize]] method.
 *
 * @example
 * ```ts
 * const result = parse(req.headers['cookie'], 'a-long-secret-to-sign-cookie')
 *
 * result.signedCookies
 * result.plainCookies
 * ```
 */
export function parse (
  cookieHeader: string,
  secretKey?: string,
): { signedCookies: { [key: string]: any }, plainCookies: { [key: string]: any } } {
  const output = { signedCookies: {}, plainCookies: {} }
  if (!cookieHeader) {
    return output
  }

  const parsed = cookie.parse(cookieHeader)

  return Object.keys(parsed).reduce((result, key: string) => {
    const unpacked = unpack(parsed[key], secretKey)
    if (unpacked === null) {
      return result
    }

    if (unpacked.signed) {
      result.signedCookies[key] = unpacked.value
    } else {
      result.plainCookies[key] = unpacked.value
    }

    return result
  }, output)
}

/**
 * Serializes a key/value pair to a string, which is supposed
 * to be set as `Set-Cookie` header value.
 *
 * @example
 * ```ts
 * const serialized = serialize('session-id', '1', 'a-long-secret-to-sign-cookie', {
 *   // optional config
 * })
 * res.setHeader('set-cookie', serialized)
 * ```
 */
export function serialize (
  key: string,
  value: any,
  secretKey?: string,
  options?: Partial<CookieOptions>,
): string | null {
  const packedValue = pack(value, secretKey)
  if (packedValue === null) {
    return null
  }

  /**
   * Invoked expires method to get the date
   */
  let expires = options?.expires
  if (typeof (expires) === 'function') {
    expires = expires()
  }

  /**
   * Parse string based max age to number
   */
  let maxAge = options?.maxAge
  if (typeof (maxAge) === 'string') {
    maxAge = ms(maxAge) / 1000
  }

  const parsedOptions = Object.assign({}, options, { maxAge, expires }) as CookieSerializeOptions
  return cookie.serialize(key, packedValue, parsedOptions)
}
