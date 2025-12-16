# Quake Wallet [v1.3.0]

<p align="center">
  Aplicación móvil en <b>React Native (Expo)</b> para visualizar instrumentos, gestionar portafolios y enviar órdenes <b>BUY/SELL</b> (Market/Limit).
</p>

<p align="center">
  <img
    src="https://i.ibb.co/XfHZ19m9/image.png"
    width="720"
    alt="Quake Wallet"
  />
</p>

<p align="center">
  <img src="https://img.shields.io/badge/version-v1.3.0-blue" alt="Version" />
  <img src="https://img.shields.io/badge/Expo-SDK%2054-black" alt="Expo" />
  <img src="https://img.shields.io/badge/TypeScript-enabled-3178c6" alt="TypeScript" />
  <img src="https://img.shields.io/badge/tests-jest%20%2B%20rntl%20%2B%20maestro-success" alt="Tests" />
</p>

## Descripción

Quake Wallet permite a los inversores:
- Visualizar instrumentos financieros con precios y retornos en tiempo real
- Consultar su portafolio personal con ganancias y rendimientos
- Buscar activos por ticker
- Enviar órdenes de compra y venta (MARKET y LIMIT)
- Monitorear el estado de las órdenes enviadas

## Features
- **Instruments**: lista desde `/instruments` con `ticker`, `name`, `last_price`, `close_price`, retorno calculado (`calculateReturn`).
- **Portfolio**: muestra `quantity`, `avg_cost_price`, `last_price`, market value y ganancias/%. Valores calculados en `src/utils/calculations`.
- **Search**: búsqueda por ticker via `GET /search?query=` con debounce de 300 ms.
- **Orders**: modal/formulario (BUY/SELL + MARKET/LIMIT). LIMIT requiere `price`; MARKET no. Convierte monto a cantidad con `Math.floor(amount / price)`. Muestra `id` y `status` de la respuesta.

## Stack Tecnológico

- **React Native** con Expo
- **React Navigation** para navegar
- **TypeScript** para tipado estático
- **Redux Toolkit** para gestión de estado
- **React Hook Form + Zod** para formularios y validación
- **Axios** para llamadas HTTP
- **Jest** y **React Native Testing Library** para testing
- **Dinero.js** y **moment** para testing

## Documentación

- [Requerimientos](./01_requerimientos.md) - Especificaciones iniciales del proyecto
- [Plan del Proyecto](./02_project_plan.md) - Documentación técnica completa

## Instalación

```bash
npm install
```

## Desarrollo

```bash
npx expo start

```

or

```bash
npx expo start -- --clear

```

Opciones para ejecutar la app:
- Presiona `a` para Android emulator
- Presiona `i` para iOS simulator
- Escanea el QR con Expo Go en tu dispositivo

## Estructura del Proyecto

El proyecto sigue una arquitectura **Layer-First**:
- `src/components/` - Componentes UI reutilizables
- `src/screens/` - Pantallas principales
- `src/store/` - Estado global con Redux
- `src/services/` - Llamadas a API
- `src/utils/` - Funciones utilitarias
- `src/types/` - Definiciones de TypeScript

## Testing
- Unit/component tests: `npm test` (tests en `__tests__/unit` y `__tests__/components`).
- E2E (Maestro): ver [`.maestro/README.md`](.maestro/README.md).

```bash
npm run test
```

## Arquitectura y estructura
- Enfoque layer-first (`src/components`, `src/screens`, `src/navigation`, `src/store`, `src/services`, `src/schemas`, `src/types`, `src/utils`, `src/i18n`).
- Cálculos y formateos en `src/utils/`; constantes de API en `src/constants/`; i18n y copy en `src/i18n/`.
- Punto de entrada: `index.js` → `App.tsx` (Redux + LocaleProvider + Navigation).

## Calidad y tooling
- Linter: `npm run lint`.
- Husky (`prepare`) instala hooks: pre-commit/pre-push ejecutan lint + tests en modo no bloqueante.

## API Backend

El proyecto se conecta a: `https://dummy-api-topaz.vercel.app`

Endpoints disponibles:
- `GET /instruments` - Lista de instrumentos
- `GET /portfolio` - Portafolio del usuario
- `GET /search?query={ticker}` - Búsqueda de activos
- `POST /orders` - Crear orden de compra/venta

## Notas
- Interceptor Axios centraliza manejo de errores (`src/services/api/client.ts` + `src/errors`).
- Búsquedas se debouncean 300 ms (`DEBOUNCE_MS`).
- Formateo monetario con Dinero.js/moment (`src/i18n/format.ts`); siempre en ARS.
- Order Modal disponible desde instruments y search; respeta validaciones de `order.schema.ts`.

### Changelog

#### [v1.3.0] - 2025-12-15
##### Added
- implement copy translates to english and spanish
 
#### [v1.2.2] - 2025-12-15
##### Added
- implement centralized error handler
#### Fixed
- fixes some e2e tests

#### [v1.2.1] - 2025-12-15
##### Added
- install new libs
- maestro e2e new tests
- new component tests (orders)
##### Fixed
- fixes on previous tests

#### [v1.2.0] - 2025-12-15
##### Added
- Add initial quality tools
##### Fixed
- husky to trigger tests on commit&push
- maestro e2e instrument tests
- unit common component tests

#### [v1.1.0] - 2025-12-14
##### Added
- UI/UX full refactoring and improves

#### [v1.0.0] - 2025-12-12
##### Added
- Initial app functionality
