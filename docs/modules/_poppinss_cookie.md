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

*Defined in [Cookie.ts:17](https://github.com/poppinss/cookie/blob/6f0d7ec/src/Cookie.ts#L17)*

#### Type declaration

___

## Functions

<a id="pack"></a>

###  pack

▸ **pack**(value: *`any`*, secretKey?: *`undefined` \| `string`*): `null` \| `string`

*Defined in [Cookie.ts:32](https://github.com/poppinss/cookie/blob/6f0d7ec/src/Cookie.ts#L32)*

Pack a value to be saved as a cookie string. If `secretKey` is defined, then cookie will be signed to avoid client side tampering

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

*Defined in [Cookie.ts:100](https://github.com/poppinss/cookie/blob/6f0d7ec/src/Cookie.ts#L100)*

Parse cookie header and return an object of cookies as `key/value` pair.

The output has two top level nodes with `signedCookies` and `plainCookies`.

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

*Defined in [Cookie.ts:131](https://github.com/poppinss/cookie/blob/6f0d7ec/src/Cookie.ts#L131)*

Serializes a key/value pair to a string, which is supposed to be set as `Set-Cookie` header value.

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

*Defined in [Cookie.ts:58](https://github.com/poppinss/cookie/blob/6f0d7ec/src/Cookie.ts#L58)*

Unpack, previously packed cookie value. If cookie was signed and `secretKey` is not passed to this method, then the signed value will be returned as a plain cookie.

**Parameters:**

| Name | Type |
| ------ | ------ |
| value | `string` |
| `Optional` secretKey | `undefined` \| `string` |

**Returns:** `null` \| `object`

___

