# Quake Wallet

MVP móvil en React Native + Expo para ver instrumentos, revisar portafolio y enviar órdenes de compra/venta. Usa precios en ARS y un backend público (`dummy-api-topaz.vercel.app`).

## Features (MVP)
- **Instruments**: lista desde `/instruments` con `ticker`, `name`, `last_price`, `close_price`, retorno calculado (`calculateReturn`).
- **Portfolio**: muestra `quantity`, `avg_cost_price`, `last_price`, market value y ganancias/%. Valores calculados en `src/utils/calculations`.
- **Search**: búsqueda por ticker via `GET /search?query=` con debounce de 300 ms.
- **Orders**: modal/formulario (BUY/SELL + MARKET/LIMIT). LIMIT requiere `price`; MARKET no. Convierte monto a cantidad con `Math.floor(amount / price)`. Muestra `id` y `status` de la respuesta.

## Reglas de negocio clave
- Retorno: `((last_price - close_price) / close_price) * 100`
- Market value: `quantity * last_price`
- Profit: `(last_price - avg_cost_price) * quantity`
- Profit %: `((last_price - avg_cost_price) / avg_cost_price) * 100`
- Estados de órdenes: LIMIT → `PENDING | REJECTED`; MARKET → `FILLED | REJECTED`

## Stack
- Expo + React Native (TypeScript)
- React Navigation (bottom tabs)
- Redux Toolkit
- React Hook Form + Zod
- Axios
- Dinero.js, moment

## Cómo correr el proyecto
```bash
# instalar (usa el lockfile existente)
npm ci

# levantar el dev server (Expo Go / emulador)
npm run start
# atajos: npm run android | npm run ios | npm run web
```

## Configuración de API
- Base URL: `https://dummy-api-topaz.vercel.app` (`src/constants/api.constants.ts`)
- Endpoints usados:
  - `GET /instruments`
  - `GET /portfolio`
  - `GET /search?query={ticker}`
  - `POST /orders`
- Precios y montos en ARS.

## Testing
- Unit/component tests: `npm test` (tests en `__tests__/unit` y `__tests__/components`).
- E2E (Maestro): ver [`.maestro/README.md`](.maestro/README.md).

## Arquitectura y estructura
- Enfoque layer-first (`src/components`, `src/screens`, `src/navigation`, `src/store`, `src/services`, `src/schemas`, `src/types`, `src/utils`, `src/i18n`).
- Cálculos y formateos en `src/utils/`; constantes de API en `src/constants/`; i18n y copy en `src/i18n/`.
- Punto de entrada: `index.js` → `App.tsx` (Redux + LocaleProvider + Navigation).

## Calidad y tooling
- Linter: `npm run lint`.
- Husky (`prepare`) instala hooks: pre-commit/pre-push ejecutan lint + tests en modo no bloqueante.

## Notas
- Interceptor Axios centraliza manejo de errores (`src/services/api/client.ts` + `src/errors`).
- Búsquedas se debouncean 300 ms (`DEBOUNCE_MS`).
- Formateo monetario con Dinero.js/moment (`src/i18n/format.ts`); siempre en ARS.
- Order Modal disponible desde instruments y search; respeta validaciones de `order.schema.ts`.
