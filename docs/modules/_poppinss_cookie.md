[@poppinss/cookie](../README.md) > [@poppinss/cookie](../modules/_poppinss_cookie.md)

# External module: @poppinss/cookie

## Index

### Type aliases

* [CookieOptions](_poppinss_cookie.md#cookieoptions)

### Functions

* [pack](_poppinss_cookie.md#pack)
* [parse](_poppinss_cookie.md#parse)
* [serialize](_poppinss_cookie.md#serialize)
* [unpack](_poppinss_cookie.md#unpack)

---

## Type aliases

<a id="cookieoptions"></a>

###  CookieOptions

**Ƭ CookieOptions**: *`object`*

*Defined in [Cookie.ts:17](https://github.com/poppinss/cookie/blob/46edbe0/src/Cookie.ts#L17)*

#### Type declaration

___

## Functions

<a id="pack"></a>

###  pack

▸ **pack**(value: *`any`*, secretKey?: *`undefined` \| `string`*): `null` \| `string`

*Defined in [Cookie.ts:41](https://github.com/poppinss/cookie/blob/46edbe0/src/Cookie.ts#L41)*

Pack a value to be saved as a cookie string. If `secretKey` is defined, then cookie will be signed to avoid client side tampering.

When setting the cookie header, it is recommended to [serialize](_poppinss_cookie.md#serialize) method instead.

*__example__*:
 ```ts
pack('hello world', 'a-long-secret-to-sign-cookie')
pack({ hello: 'world' }, 'a-long-secret-to-sign-cookie')
```

**Parameters:**

| Name | Type |
| ------ | ------ |
| value | `any` |
| `Optional` secretKey | `undefined` \| `string` |

**Returns:** `null` \| `string`

___
<a id="parse"></a>

###  parse

▸ **parse**(cookieHeader: *`string`*, secretKey?: *`undefined` \| `string`*): `object`

*Defined in [Cookie.ts:128](https://github.com/poppinss/cookie/blob/46edbe0/src/Cookie.ts#L128)*

Parse cookie header and return an object of cookies as `key/value` pair. The output of this method has two top level objects explained below:

Signed cookies
--------------

An object of cookies that are successfully verified and not being tampered.

Plain cookies
-------------

An object of cookies that were not signed initially via [serialize](_poppinss_cookie.md#serialize) method.

*__example__*:
 ```ts
const result = parse(req.headers['cookie'], 'a-long-secret-to-sign-cookie')

result.signedCookies
result.plainCookies
```

**Parameters:**

| Name | Type |
| ------ | ------ |
| cookieHeader | `string` |
| `Optional` secretKey | `undefined` \| `string` |

**Returns:** `object`

___
<a id="serialize"></a>

###  serialize

▸ **serialize**(key: *`string`*, value: *`any`*, secretKey?: *`undefined` \| `string`*, options?: *`Partial`<[CookieOptions](_poppinss_cookie.md#cookieoptions)>*): `string` \| `null`

*Defined in [Cookie.ts:167](https://github.com/poppinss/cookie/blob/46edbe0/src/Cookie.ts#L167)*

Serializes a key/value pair to a string, which is supposed to be set as `Set-Cookie` header value.

*__example__*:
 ```ts
const serialized = serialize('session-id', '1', 'a-long-secret-to-sign-cookie', {
  // optional config
})
res.setHeader('set-cookie', serialized)
```

**Parameters:**

| Name | Type |
| ------ | ------ |
| key | `string` |
| value | `any` |
| `Optional` secretKey | `undefined` \| `string` |
| `Optional` options | `Partial`<[CookieOptions](_poppinss_cookie.md#cookieoptions)> |

**Returns:** `string` \| `null`

___
<a id="unpack"></a>

###  unpack

▸ **unpack**(value: *`string`*, secretKey?: *`undefined` \| `string`*): `null` \| `object`

*Defined in [Cookie.ts:73](https://github.com/poppinss/cookie/blob/46edbe0/src/Cookie.ts#L73)*

Unpack, previously packed cookie value. If cookie was signed and `secretKey` is not passed to this method, then the signed value will be returned as a plain cookie.

*__example__*:
 ```ts
const packed = pack('hello world', 'a-long-secret-to-sign-cookie')
unpack(packed, 'a-long-secret-to-sign-cookie') // hello-world
```

**Parameters:**

| Name | Type |
| ------ | ------ |
| value | `string` |
| `Optional` secretKey | `undefined` \| `string` |

**Returns:** `null` \| `object`

___

