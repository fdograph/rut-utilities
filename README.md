# 🇨🇱 Chilean Rut Utilities 🇨🇱

<div id="contents"></div>

<details>
  <summary><strong>Table of Contents</strong></summary>

- <a href="#intro">:speech_balloon: Intro</a>
- <a href="#dependencies">:package: Dependencies</a>
- <a href="#getting-started">:rocket: Getting Started</a>
- <a href="#usage">:wrench: Usage</a>
- <a href="#license">:page_facing_up: License</a>

</details>

<div id="intro"></div>

## :speech_balloon: Intro

>Set of utility functions to parse, validate and generate a [Chilean R.U.T.](https://es.wikipedia.org/wiki/Rol_%C3%9Anico_Tributario)
>Meant for developer who want to interact, manipulate and validate Chilean R.U.T.

<div id="dependencies"></div>

## :package: Dependencies

>Dependencies that are needed by people who want to install your project
>For example:

- [Node.js](https://nodejs.org/en/)
- [NPM](https://www.npmjs.com/) or [YARN](https://yarnpkg.com/lang/en/)

<a href="#contents">:top: <sub>back to top</sub></a>

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

> `validateRut(rut: string) => boolean`

Returns true if the passed `string` corresponds to a fully valid R.U.T.

```bash
import { validateRut } from '@fdograph/rut-utilities';

validateRut('18585543-0');
> true

validateRut('18.585.543-0');
> true

validateRut('9.999.999-9');
> false
```
---

> `formatRut(rut: string, format?: RutFormat) => string`

Formats a `rut-like` string according to the `format` parameter.

```javascript
enum RutFormat {
	DOTS  =  0,
	DASH  =  1,
	DOTS_DASH  =  2
}
```
```bash
import { formatRut, RutFormat } from '@fdograph/rut-utilities';

formatRut('44.333.222-1');
> '44333222-1'

formatRut('44333222-1', RutFormat.DOTS_DASH);
> '44.333.222-1'

formatRut('44333222-1', RutFormat.DOTS);
> '44.333.2221'
```

You can see the full set of utility functions in the [Tests](src/tests/index.test.ts)

<div id="license"></div>

## :page_facing_up: License

This project is licensed under the Apache 2.0 License - see the [LICENSE](LICENSE) file for details.

<a href="#contents">:top: <sub>back to top</sub></a>
