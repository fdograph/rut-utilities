# 🇨🇱 Chilean Rut Utilities 🇨🇱

![Coverage - Branches](badges/badge-branches.svg)
![Coverage - Functions](badges/badge-functions.svg)
![Coverage - Lines](badges/badge-lines.svg)
![Coverage - Statements](badges/badge-statements.svg)

## [:es: Versión en Español](README-es.md)

---

<div id="contents"></div>

<details>
  <summary><strong>Table of Contents</strong></summary>
  
- <a href="README-es.md">:es: Versión en Español</a>
- <a href="#intro">:speech_balloon: Intro</a>
- <a href="#getting-started">:rocket: Getting Started</a>
- <a href="#usage">:wrench: Usage</a>
- <a href="#license">:page_facing_up: License</a>
</details>

---

<div id="intro"></div>

## :speech_balloon: Intro

>Fully typed set of utility functions to parse, validate and generate a [Chilean R.U.T.](https://es.wikipedia.org/wiki/Rol_%C3%9Anico_Tributario)
>
>Meant for developers who want to interact, manipulate and validate Chilean R.U.T.


<div id="getting-started"></div>

## :rocket: Getting started

### Npm & Yarn install:

```bash
$ npm install @fdograph/rut-utilities

$ yarn add @fdograph/rut-utilities
```

<a href="#contents">:top: <sub>back to top</sub></a>

<div id="getting-started"></div>

## :wrench: Usage

> `validateRut(rut?: string, noSuspicious = true) => boolean`

Returns `true` if the passed `string` corresponds to a fully valid R.U.T. This is a valid `rut-like` `string` that passes the official mathematical validation algorithm and does not conform to the "suspicious" R.U.T. pattern. Eg: `44.444.444-4`, `22.222.222-2`, `3.333.333-3`, `9999999-9`

```typescript
import { validateRut } from '@fdograph/rut-utilities';

validateRut('18585543-0');
> true

validateRut('18.585.543-0');
> true

validateRut('9.999.999-9');
> false

validateRut('44.444.444-4');
> false
```

To avoid the "suspicious" R.U.T. validation we can override the `noSuspicious` argument and pass it as `false`. This will change the behaviour of this method making it skip the "suspicious" pattern validation.

```typescript
import { validateRut } from '@fdograph/rut-utilities';

validateRut('18585543-0', false);
> true

validateRut('18.585.543-0', false);
> true

validateRut('9.999.999-9', false);
> true

validateRut('44.444.444-4', false);
> true
```

---

> `validateRutList(ruts: Iterable<string>, noSuspicious = false) => Map<string, boolean>`

Returns a results [Map](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map) in which each entry has a `key` corresponding to the input and the `value` corresponding to its validation result.

```typescript
import { validateRutList } from '@fdograph/rut-utilities';

const validRuts = ['7775735-k', '18585543-0', '18348353-6'];
const result = validateRutList(validRuts);

result.get('7775735-k');
> true

result.get(validRuts[1]);
> true

```
---

> `formatRut(rut?: string, format?: RutFormat = RutFormat.DASH) => string`

Formats a `rut-like` string according to the `format` parameter or returns the intact string if this doesn't match a `rut-like` string pattern.

```typescript
enum RutFormat {
	DOTS,
	DASH,
	DOTS_DASH
}
```
```typescript
import { formatRut, RutFormat } from '@fdograph/rut-utilities';

formatRut('44.333.222-1');
> '44333222-1'

formatRut('44333222-1', RutFormat.DOTS_DASH);
> '44.333.222-1'

formatRut('44333222-1', RutFormat.DOTS);
> '44.333.2221'

formatRut('jg7gk-1', RutFormat.DOTS);
> 'jg7gk-1'
```

---

> `deconstructRut(rut: string) => DeconstructedRut`

Returns an object containing the RUT's `digits` and `verifier`.

You can use [Destructuring](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment) to access each.

```typescript
type DeconstructedRut = {
  digits: string;
  verifier: string;
}
```

```typescript
import { deconstructRut } from '@fdograph/rut-utilities';

const { digits, verifier } = deconstructRut('7775735-k');

console.log(digits);
> '7775735'

console.log(verifier);
> 'k'

```
---

You can see the full set of utility functions in the [Tests](src/tests/main.test.ts)

<div id="license"></div>

## :page_facing_up: License

This project is licensed under the Apache 2.0 License - see the [LICENSE](LICENSE) file for details.

<a href="#contents">:top: <sub>back to top</sub></a>
