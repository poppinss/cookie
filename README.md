<div align="center">
  <img src="https://res.cloudinary.com/adonisjs/image/upload/q_100/v1557762307/poppinss_iftxlt.jpg" width="600px">
</div>


# Cookie
> Cookie parser and serializer for Node.js

[![circleci-image]][circleci-url] [![typescript-image]][typescript-url] [![npm-image]][npm-url] [![license-image]][license-url]

A generic cookie parser and serializer for Node.js. This module exports handful of functions that can be used with any framework or even raw HTTP server to `parse` and `serialize` cookies.


<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
## Table of contents

- [Installation](#installation)
- [Usage](#usage)
- [Config](#config)
- [Signing cookies](#signing-cookies)
- [Parsing cookies](#parsing-cookies)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Installation
Install the package from npm as follows:

```sh
npm i @poppinss/cookie

# yarn
yarn add @poppinss/cookie
```

## Usage

```ts
import { serialize, CookieOptions } from '@poppinss/cookie'
import { createServer } from 'http'

const options: CookieOptions = {
  domain: 'foo.com',
  expires: () => {
    const expiresAt = new Date()

    // Expires in a week
    expiresAt.setDate(new Date().getDate() + 7)
  },
  httpOnly: true,
  path: '/',
  sameSite: true,
  secure: false,
}

createServer((req, res) => {
  const value = serialize('session-id', '1', null, options)
  res.setHeader('set-cookie', value)
  res.end()
})
```

## Config
Under the hood this package uses [cookie](https://www.npmjs.com/package/cookie) module, so make sure to check their [docs](https://www.npmjs.com/package/cookie#options-1) for the config.

## Signing cookies
It is recommended to sign the cookie values using a secret. The signed cookies ensures that they are not tampered on the client side and can be fully trusted.

To sign a cookie, you need to pass a `secret` as 3rd argument to the serialize method.

```ts
import { serialize } from '@poppinss/cookie'
const serialized = serialize('key', 'value', 'a-long-secret-to-sign-cookie')

res.setHeader('set-cookie', serialized)
```

For reading signed cookies, you will need the same secret, otherwise they will be considered as tampered and removed from the output.

## Parsing cookies
You can parse the incoming cookies using the `parse` method.

```ts
import { parse } from '@poppinss/cookie'
const parsed = parse(req.headers.cookie)
```

For parsing signed cookies, you need the same secret that was used for signing cookies.

```ts
import { parse } from '@poppinss/cookie'

const parsed = parse(
  req.headers.cookie,
  'a-long-secret-to-sign-cookie'
)
```

[circleci-image]: https://img.shields.io/circleci/project/github/poppinss/cookie/master.svg?style=for-the-badge&logo=circleci
[circleci-url]: https://circleci.com/gh/poppinss/cookie "circleci"

[typescript-image]: https://img.shields.io/badge/Typescript-294E80.svg?style=for-the-badge&logo=typescript
[typescript-url]:  "typescript"

[npm-image]: https://img.shields.io/npm/v/@poppinss/cookie.svg?style=for-the-badge&logo=npm
[npm-url]: https://npmjs.org/package/@poppinss/cookie "npm"

[license-image]: https://img.shields.io/npm/l/@poppinss/cookie?color=blueviolet&style=for-the-badge
[license-url]: LICENSE.md "license"
