# 🇨🇱 Chilean Rut Utilities 🇨🇱

![Coverage - Branches](badges/badge-branches.svg)
![Coverage - Functions](badges/badge-functions.svg)
![Coverage - Lines](badges/badge-lines.svg)
![Coverage - Statements](badges/badge-statements.svg)

### [:uk: English version](README.md)

<div id="contents"></div>

<details>
  <summary><strong>Tabla de contenidos:</strong></summary>
  
- <a href="README.md">:uk: English version</a>
- <a href="#intro">:speech_balloon: Introducción</a>
- <a href="#getting-started">:rocket: Cómo empezar</a>
- <a href="#usage">:wrench: Uso</a>
- <a href="#license">:page_facing_up: Licencia</a>
</details>

<div id="intro"></div>

## :speech_balloon: Introducción

>Set de funciones utilitarias para generar, procesar y validar un [R.U.T. Chileno](https://es.wikipedia.org/wiki/Rol_%C3%9Anico_Tributario)
>
>Pensado para desarroladores que deseen interactuar, manipular of validar RUTs.


<div id="getting-started"></div>

## :rocket: Cómo empezar

### Npm & Yarn install:

```bash
$ npm install @fdograph/rut-utilities

$ yarn add @fdograph/rut-utilities
```

<div id="getting-started"></div>

## :wrench: Uso

> `validateRut(rut: string) => boolean`

Retorna `true` si el `string` dado corresponde a un R.U.T. válido.

```javascript
import { validateRut } from '@fdograph/rut-utilities';

validateRut('18585543-0');
> true

validateRut('18.585.543-0');
> true

validateRut('9.999.999-9');
> false
```
---

> `validateRutList(ruts: string[]) => Map<string, boolean>`

Retorna un [Mapa](https://developer.mozilla.org/es/docs/Web/JavaScript/Referencia/Objetos_globales/Map) que contendrá el resultado de la validación indexada en base a cada rut.

```javascript
import { validateRutList } from '@fdograph/rut-utilities';

const validRuts = ['7775735-k', '18585543-0', '18348353-6'];
const result = validateRutList(validRuts);

result.get('7775735-k');
> true

result.get(validRuts[1]);
> true

```
---

> `formatRut(rut: string, format?: RutFormat = RutFormat.DASH) => string`

Da formato a una cadena con `forma de rut` (Ej: `"33.333.333-3"`) de acuerdo al valor del parámetro `format`. En el caso de que `rut` tenga un patrón no válido se retornará la cadena intacta.

```typescript
enum RutFormat {
	DOTS,
	DASH,
	DOTS_DASH
}
```
```javascript
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

Descompone un cadena con forma de RUT y retorna un objeto con los valores `digits` y `verifier`

```typescript
type DeconstructedRut = {
  digits: string;
  verifier: string;
}
```

```javascript
import { deconstructRut } from '@fdograph/rut-utilities';

const { digits, verifier } = deconstructRut('7775735-k');

console.log(digits);
> '7775735'

console.log(verifier);
> 'k'

```
---

Puedes revisar el set completo de functiones utilitaria en los [Tests](src/tests/main.test.ts)

<div id="license"></div>

## :page_facing_up: License

This project is licensed under the Apache 2.0 License - see the [LICENSE](LICENSE) file for details.
