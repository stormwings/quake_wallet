# Quake Wallet [v1.2.1]

Aplicación móvil desarrollada en React Native para visualizar instrumentos financieros, gestionar portafolios de inversión y enviar órdenes de compra/venta al mercado.

## Descripción

Quake Wallet permite a los inversores:
- Visualizar instrumentos financieros con precios y retornos en tiempo real
- Consultar su portafolio personal con ganancias y rendimientos
- Buscar activos por ticker
- Enviar órdenes de compra y venta (MARKET y LIMIT)
- Monitorear el estado de las órdenes enviadas

## Stack Tecnológico

- **React Native** con Expo
- **TypeScript** para tipado estático
- **Redux Toolkit** para gestión de estado
- **React Hook Form + Zod** para formularios y validación
- **Axios** para llamadas HTTP
- **Jest** y **React Native Testing Library** para testing

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

```bash
# Unit tests
npm test

# E2E tests
npm run test:e2e
```

## API Backend

El proyecto se conecta a: `https://dummy-api-topaz.vercel.app`

Endpoints disponibles:
- `GET /instruments` - Lista de instrumentos
- `GET /portfolio` - Portafolio del usuario
- `GET /search?query={ticker}` - Búsqueda de activos
- `POST /orders` - Crear orden de compra/venta

# Changelog

## [v1.2.1] - 2025-12-15
### Added
- install new libs
- maestro e2e new tests
- new component tests (orders)
### Fixed
- - fixes on previous tests
- - 
## [v1.2.0] - 2025-12-15
### Added
- Add initial quality tools
### Fixed
- - husky to trigger tests on commit&push
- - maestro e2e instrument tests
- - unit common component tests
- - 
## [v1.1.0] - 2025-12-14
### Added
- UI/UX full refactoring and improves
### Fixed
- -
## [v1.0.0] - 2025-12-12
### Added
- Initial app functionality
### Fixed
- -