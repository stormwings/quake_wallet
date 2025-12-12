# Plan de Proyecto: Quake Wallet (MVP)

## Documentación Técnica

---

# ÍNDICE

1. [Visión General del Proyecto](#1-visión-general-del-proyecto)
2. [Objetivos del Sistema](#2-objetivos-del-sistema)
3. [Alcance del Proyecto](#3-alcance-del-proyecto)
4. [Requisitos Funcionales](#4-requisitos-funcionales)
5. [Requisitos No Funcionales](#5-requisitos-no-funcionales)
6. [Stack Tecnológico](#6-stack-tecnológico)
7. [Arquitectura del Sistema](#7-arquitectura-del-sistema)
8. [Estructura de Carpetas](#8-estructura-de-carpetas)
9. [Módulos del Sistema](#9-módulos-del-sistema)
10. [Manejo de Errores](#10-manejo-de-errores)
11. [Testing](#11-testing)

---

# 1. VISIÓN GENERAL DEL PROYECTO

## 1.1 Descripción del Proyecto

**Quake Wallet** es una aplicación móvil desarrollada en React Native que permite a los usuarios visualizar instrumentos financieros, gestionar su portafolio de inversiones y enviar órdenes de compra/venta al mercado. El sistema opera con precios en pesos argentinos.

## 1.2 Propósito

El propósito principal es proporcionar una herramienta móvil para inversores, permitiendo:

- Visualizar instrumentos financieros con sus precios y retornos
- Consultar el portafolio personal con ganancias y rendimientos
- Buscar activos por ticker
- Enviar órdenes de compra y venta al mercado
- Monitorear el estado de las órdenes enviadas

## 1.3 Usuarios Objetivo

| Tipo de Usuario | Descripción | Necesidades Principales |
|-----------------|-------------|------------------------|
| **Inversor** | Usuario que opera en el mercado | Ver instrumentos, gestionar portafolio, enviar órdenes |

## 1.4 Contexto del Negocio

- **Mercado local**: Operaciones en pesos argentinos (ARS)
- **Activos**: Acciones e instrumentos financieros del mercado local
- **Órdenes**: Soporte para órdenes MARKET y LIMIT
- **Tiempo real**: Precios actualizados desde API backend

---

# 2. OBJETIVOS DEL SISTEMA

## 2.1 Objetivos Generales

1. **Visualización**: Mostrar información clara de instrumentos y portafolio
2. **Operatividad**: Permitir el envío de órdenes de compra/venta
3. **Usabilidad**: Interfaz intuitiva y fluida en dispositivos móviles
4. **Mantenibilidad**: Código estructurado y testeable

## 2.2 Objetivos Específicos

### Funcionales

- Listar instrumentos con ticker, nombre, precio y retorno calculado
- Mostrar portafolio con posiciones, valor de mercado y rendimiento
- Implementar búsqueda de activos por ticker
- Crear formulario de órdenes con validaciones
- Mostrar feedback del estado de órdenes enviadas

### Técnicos

- Implementar arquitectura layer-first
- Utilizar TypeScript para tipado estático
- Gestionar estado global con Redux
- Validar formularios con React Hook Form + Zod
- Implementar unit tests en lógica crítica
- Implementar E2E tests en flujos críticos

---

# 3. ALCANCE DEL PROYECTO

## 3.1 Dentro del Alcance (MVP)

### Módulos Incluidos

1. **Instruments**
   - Listado de instrumentos desde API
   - Visualización de ticker, nombre, último precio
   - Cálculo y visualización de retorno

2. **Portfolio**
   - Listado de posiciones del usuario
   - Cálculo de valor de mercado (quantity × last_price)
   - Cálculo de ganancia y rendimiento usando avg_cost_price

3. **Search**
   - Buscador de activos por ticker
   - Resultados filtrados en tiempo real

4. **Orders**
   - Modal de creación de órdenes
   - Soporte para BUY/SELL
   - Soporte para MARKET/LIMIT
   - Input por cantidad de acciones o monto en pesos
   - Visualización de respuesta (id, status)

## 3.2 Fuera del Alcance (MVP)

- Autenticación de usuarios
- Historial de órdenes
- Gráficos de precios
- News section

## 3.3 Supuestos

1. El backend proporcionará endpoints RESTful funcionales
2. Los precios vienen en pesos argentinos (ARS)
3. No se requiere autenticación para el MVP

## 3.4 Restricciones

1. No se admiten fracciones de acciones
2. Solo operaciones de lectura (GET) excepto para órdenes (POST)
3. Compatibilidad con iOS y Android via Expo

---

# 4. REQUISITOS FUNCIONALES

## 4.1 RF-001: Módulo de Instrumentos

### RF-001.1 Listado de Instrumentos

- Obtener lista de instrumentos desde endpoint GET
- Mostrar para cada instrumento: ticker, nombre, último precio
- Calcular retorno: `((last_price - close_price) / close_price) * 100`
- Mostrar retorno con indicador visual (positivo/negativo)

### RF-001.2 Interacción

- Al hacer click en un instrumento, abrir modal de órdenes
- Pull-to-refresh para actualizar lista

## 4.2 RF-002: Módulo de Portfolio

### RF-002.1 Listado de Posiciones

- Obtener posiciones del usuario desde endpoint GET
- Mostrar para cada posición:
  - Ticker
  - Cantidad de la posición
  - Valor de mercado
  - Ganancia total ($)
  - Rendimiento total (%)

### RF-002.2 Cálculos de Rendimiento

- Valor de mercado: `quantity × last_price`
- Ganancia ($): `(last_price - avg_cost_price) × quantity`
- Rendimiento (%): `((last_price - avg_cost_price) / avg_cost_price) × 100`

## 4.3 RF-003: Módulo de Búsqueda

### RF-003.1 Buscador

- Input de búsqueda por ticker
- Filtrado en tiempo real con debounce
- Mostrar resultados coincidentes
- Click en resultado abre modal de órdenes

## 4.4 RF-004: Módulo de Órdenes

### RF-004.1 Modal de Orden

- Campos requeridos:
  - Tipo de operación: BUY | SELL
  - Tipo de orden: MARKET | LIMIT
  - Cantidad de acciones O monto en pesos
  - Precio límite (solo si tipo es LIMIT)

### RF-004.2 Cálculo de Cantidad

- Si usuario ingresa monto en pesos: `Math.floor(monto / last_price)`
- Validar que cantidad sea entero positivo

### RF-004.3 Envío y Respuesta

- Enviar POST con body estructurado
- Mostrar respuesta: id y status
- Estados posibles:
  - MARKET → FILLED o REJECTED
  - LIMIT → PENDING o REJECTED

### RF-004.4 Definición de Estados

| Estado | Descripción |
|--------|-------------|
| **PENDING** | Cuando una orden LIMIT es enviada al mercado, se envía con este estado. La orden queda esperando ejecución. |
| **FILLED** | Cuando una orden se ejecuta. Las órdenes MARKET son ejecutadas inmediatamente al ser enviadas. |
| **REJECTED** | Cuando la orden es rechazada por el mercado porque no cumple con los requerimientos (ej: monto mayor al disponible). |

### RF-004.5 Validaciones

- Cantidad debe ser mayor a 0
- Precio límite requerido solo para órdenes LIMIT
- Precio límite debe ser mayor a 0

---

# 5. REQUISITOS NO FUNCIONALES

## 5.2 RNF-002: Mantenibilidad

- Separación clara por capas (layer-first)
- Tipado estricto con TypeScript
- Unit tests en lógica de cálculos y validaciones
- E2E tests en flujos críticos de usuario
- Componentes reutilizables

## 5.3 RNF-003: Usabilidad

- Feedback visual en todas las acciones
- Estados de loading claros
- Mensajes de error comprensibles
- Formateo de moneda en pesos (ARS)

---

# 6. STACK TECNOLÓGICO

## 6.1 Core

| Tecnología | Versión | Propósito |
|------------|---------|-----------|
| React Native | [ver] | Framework móvil |
| Expo | [ver] | Toolchain y builds |
| TypeScript | [ver] | Tipado estático |

## 6.2 Navegación

| Tecnología | Propósito |
|------------|-----------|
| @react-navigation/native | Core de navegación |
| @react-navigation/native-stack | Stack navigator |
| @react-navigation/bottom-tabs | Tab navigator |

## 6.3 Estado

| Tecnología | Propósito |
|------------|-----------|
| Redux Toolkit | Estado global |
| React Redux | Bindings React |

## 6.4 Formularios y Validación

| Tecnología | Propósito |
|------------|-----------|
| React Hook Form | Manejo de formularios |
| Zod | Validación de schemas |
| @hookform/resolvers | Integración RHF + Zod |

## 6.5 Utilidades

| Tecnología | Propósito |
|------------|-----------|
| Axios | Cliente HTTP |
| Dinero.js | Manejo de moneda (opcional) |

## 6.6 Testing

| Tecnología | Propósito |
|------------|-----------|
| Jest | Test runner (unit tests) |
| React Native Testing Library | Testing de componentes |
| E2E Framework | Testing end-to-end en dispositivos |

---

# 7. ARQUITECTURA DEL SISTEMA

## 7.1 Visión General

La arquitectura sigue el patrón **Layer-First**, organizando el código por responsabilidad técnica en lugar de por feature. Esto facilita la reutilización y mantiene una separación clara de concerns.

## 7.2 Capas de la Aplicación

```
┌─────────────────────────────────────────────────────────────────┐
│                        PRESENTATION LAYER                        │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐             │
│  │   Screens   │  │ Components  │  │   Modals    │             │
│  └─────────────┘  └─────────────┘  └─────────────┘             │
├─────────────────────────────────────────────────────────────────┤
│                         STATE LAYER                              │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐             │
│  │   Slices    │  │  Selectors  │  │    Store    │             │
│  └─────────────┘  └─────────────┘  └─────────────┘             │
├─────────────────────────────────────────────────────────────────┤
│                        SERVICES LAYER                            │
│  ┌─────────────┐  ┌─────────────┐                               │
│  │     API     │  │   Schemas   │                               │
│  └─────────────┘  └─────────────┘                               │
├─────────────────────────────────────────────────────────────────┤
│                         UTILS LAYER                              │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐             │
│  │ Formatters  │  │Calculations │  │   Helpers   │             │
│  └─────────────┘  └─────────────┘  └─────────────┘             │
└─────────────────────────────────────────────────────────────────┘
```

## 7.3 Descripción de Capas

### Presentation Layer

- **Screens**: Pantallas principales (Instruments, Portfolio, Search)
- **Components**: Componentes UI reutilizables
- **Modals**: Modal de órdenes

### State Layer (Redux)

- **Slices**: instrumentsSlice, portfolioSlice, ordersSlice
- **Selectors**: Selectores memoizados para derivar datos
- **Store**: Configuración central de Redux

### Services Layer

- **API**: Funciones para llamadas HTTP (axios)
- **Schemas**: Schemas Zod para validación

### Utils Layer

- **Formatters**: Formateo de moneda, porcentajes
- **Calculations**: Lógica de cálculos (retorno, ganancia, cantidad de acciones)
- **Helpers**: Funciones utilitarias generales

## 7.4 Flujo de Datos

```
┌──────────┐    ┌──────────┐    ┌──────────┐    ┌──────────┐
│   User   │───▶│  Screen  │───▶│  Redux   │───▶│   API    │
│  Action  │    │          │    │ Dispatch │    │  Call    │
└──────────┘    └──────────┘    └──────────┘    └──────────┘
                                                      │
                                                      ▼
┌──────────┐    ┌──────────┐    ┌──────────┐    ┌──────────┐
│    UI    │◀───│ Selector │◀───│  Redux   │◀───│ Response │
│  Update  │    │          │    │  Store   │    │          │
└──────────┘    └──────────┘    └──────────┘    └──────────┘
```

## 7.5 Navegación

```
┌─────────────────────────────────────────┐
│            Bottom Tab Navigator          │
├─────────────┬─────────────┬─────────────┤
│ Instruments │  Portfolio  │   Search    │
│   Screen    │   Screen    │   Screen    │
└─────────────┴─────────────┴─────────────┘
                    │
                    ▼
           ┌───────────────┐
           │  Order Modal  │
           │   (Overlay)   │
           └───────────────┘
```

---

# 8. ESTRUCTURA DE CARPETAS

```
quake-wallet/
├── app.json
├── App.tsx
├── babel.config.js
├── tsconfig.json
├── package.json
│
├── src/
│   ├── components/
│   │   ├── common/
│   │   │   ├── Button.tsx
│   │   │   ├── Card.tsx
│   │   │   ├── Input.tsx
│   │   │   ├── Loading.tsx
│   │   │   ├── ErrorMessage.tsx
│   │   │   └── index.ts
│   │   │
│   │   ├── instruments/
│   │   │   ├── InstrumentCard.tsx
│   │   │   ├── InstrumentList.tsx
│   │   │   └── index.ts
│   │   │
│   │   ├── portfolio/
│   │   │   ├── PositionCard.tsx
│   │   │   ├── PositionList.tsx
│   │   │   └── index.ts
│   │   │
│   │   ├── search/
│   │   │   ├── SearchInput.tsx
│   │   │   ├── SearchResults.tsx
│   │   │   └── index.ts
│   │   │
│   │   ├── orders/
│   │   │   ├── OrderModal.tsx
│   │   │   ├── OrderForm.tsx
│   │   │   ├── OrderTypeSelector.tsx
│   │   │   ├── QuantityInput.tsx
│   │   │   ├── OrderResponse.tsx
│   │   │   └── index.ts
│   │   │
│   │   └── index.ts
│   │
│   ├── screens/
│   │   ├── InstrumentsScreen.tsx
│   │   ├── PortfolioScreen.tsx
│   │   ├── SearchScreen.tsx
│   │   └── index.ts
│   │
│   ├── navigation/
│   │   ├── RootNavigator.tsx
│   │   ├── TabNavigator.tsx
│   │   └── index.ts
│   │
│   ├── store/
│   │   ├── index.ts
│   │   ├── hooks.ts
│   │   │
│   │   └── slices/
│   │       ├── instrumentsSlice.ts
│   │       ├── portfolioSlice.ts
│   │       ├── ordersSlice.ts
│   │       └── index.ts
│   │
│   ├── services/
│   │   ├── api/
│   │   │   ├── client.ts
│   │   │   ├── instruments.api.ts
│   │   │   ├── portfolio.api.ts
│   │   │   ├── orders.api.ts
│   │   │   └── index.ts
│   │   │
│   │   └── index.ts
│   │
│   ├── schemas/
│   │   ├── order.schema.ts
│   │   └── index.ts
│   │
│   ├── types/
│   │   ├── instrument.types.ts
│   │   ├── portfolio.types.ts
│   │   ├── order.types.ts
│   │   ├── api.types.ts
│   │   └── index.ts
│   │
│   ├── utils/
│   │   ├── formatters/
│   │   │   ├── currency.ts
│   │   │   ├── percentage.ts
│   │   │   └── index.ts
│   │   │
│   │   ├── calculations/
│   │   │   ├── returns.ts
│   │   │   ├── portfolio.ts
│   │   │   ├── orders.ts
│   │   │   └── index.ts
│   │   │
│   │   └── index.ts
│   │
│   ├── hooks/
│   │   ├── useDebounce.ts
│   │   └── index.ts
│   │
│   └── constants/
│       ├── api.constants.ts
│       ├── order.constants.ts
│       └── index.ts
│
├── __tests__/
│   ├── unit/
│   │   ├── calculations.test.ts
│   │   └── formatters.test.ts
│   │
│   └── components/
│       └── OrderForm.test.tsx
│
└── e2e/
    ├── instruments.e2e.ts
    ├── portfolio.e2e.ts
    ├── search.e2e.ts
    ├── orders.e2e.ts
    └── flows/
        └── buy-order.e2e.ts
```

---

# 9. MÓDULOS DEL SISTEMA

## 9.1 Módulo: Instruments

### Propósito

Mostrar listado de instrumentos financieros disponibles con sus precios y retornos.

### Componentes

| Componente | Descripción |
|------------|-------------|
| InstrumentsScreen | Pantalla principal del tab |
| InstrumentList | Lista scrolleable de instrumentos |
| InstrumentCard | Card individual con datos del instrumento |

### API Endpoint

```
GET https://dummy-api-topaz.vercel.app/instruments
```

### Datos Requeridos (API Response)

```typescript
interface Instrument {
  id: number;
  ticker: string;
  name: string;
  type: 'ACCIONES' | 'MONEDA';
  last_price: number;
  close_price: number;
}
```

**Ejemplo de respuesta:**

```json
[
  {
    "id": 1,
    "ticker": "DYCA",
    "name": "Dycasa S.A.",
    "type": "ACCIONES",
    "last_price": 45.72,
    "close_price": 50.07
  },
  {
    "id": 2,
    "ticker": "CAPX",
    "name": "Capex S.A.",
    "type": "ACCIONES",
    "last_price": 53.68,
    "close_price": 49.71
  },
  {
    "id": 11,
    "ticker": "GAMI",
    "name": "Boldt Gaming S.A.",
    "type": "ACCIONES",
    "last_price": 97.56,
    "close_price": 88.31
  }
]
```

### Cálculos

```typescript
// returns.ts
export const calculateReturn = (lastPrice: number, closePrice: number): number => {
  return ((lastPrice - closePrice) / closePrice) * 100;
};
```

---

## 9.2 Módulo: Portfolio

### Propósito

Mostrar las posiciones del usuario con valor de mercado y rendimiento.

### Componentes

| Componente | Descripción |
|------------|-------------|
| PortfolioScreen | Pantalla principal del tab |
| PositionList | Lista de posiciones |
| PositionCard | Card con datos de posición |

### API Endpoint

```
GET https://dummy-api-topaz.vercel.app/portfolio
```

### Datos Requeridos (API Response)

```typescript
interface Position {
  instrument_id: number;
  ticker: string;
  quantity: number;
  last_price: number;
  close_price: number;
  avg_cost_price: number;
}
```

**Ejemplo de respuesta:**

```json
[
  {
    "instrument_id": 13,
    "ticker": "INTR",
    "quantity": 4,
    "last_price": 84.27,
    "close_price": 76.57,
    "avg_cost_price": 94.66
  },
  {
    "instrument_id": 18,
    "ticker": "HARG",
    "quantity": 42,
    "last_price": 78.25,
    "close_price": 71.13,
    "avg_cost_price": 13.57
  },
  {
    "instrument_id": 15,
    "ticker": "FIPL",
    "quantity": 57,
    "last_price": 85.96,
    "close_price": 78.15,
    "avg_cost_price": 27.47
  }
]
```

### Cálculos

```typescript
// portfolio.ts
export const calculateMarketValue = (quantity: number, lastPrice: number): number => {
  return quantity * lastPrice;
};

export const calculateProfit = (
  quantity: number,
  lastPrice: number,
  avgCostPrice: number
): number => {
  return (lastPrice - avgCostPrice) * quantity;
};

export const calculateProfitPercentage = (
  lastPrice: number,
  avgCostPrice: number
): number => {
  return ((lastPrice - avgCostPrice) / avgCostPrice) * 100;
};
```

---

## 9.3 Módulo: Search

### Propósito

Permitir búsqueda de instrumentos por ticker.

### Componentes

| Componente | Descripción |
|------------|-------------|
| SearchScreen | Pantalla principal del tab |
| SearchInput | Input con debounce |
| SearchResults | Lista de resultados filtrados |

### API Endpoint

```
GET https://dummy-api-topaz.vercel.app/search?query={ticker}
```

### Datos Requeridos (API Response)

```typescript
// Misma estructura que Instrument
interface SearchResult {
  id: number;
  ticker: string;
  name: string;
  type: 'ACCIONES' | 'MONEDA';
  last_price: number;
  close_price: number;
}
```

**Ejemplo de request y respuesta:**

```
GET /search?query=DYC
```

```json
[
  {
    "id": 1,
    "ticker": "DYCA",
    "name": "Dycasa S.A.",
    "type": "ACCIONES",
    "last_price": 45.72,
    "close_price": 50.07
  }
]
```

### Lógica

- Debounce de 300ms en input
- Query parameter enviado al endpoint
- Reutiliza InstrumentCard para resultados

---

## 9.4 Módulo: Orders

### Propósito

Permitir envío de órdenes de compra/venta.

### Componentes

| Componente | Descripción |
|------------|-------------|
| OrderModal | Modal container |
| OrderForm | Formulario principal |
| OrderTypeSelector | Selector BUY/SELL y MARKET/LIMIT |
| QuantityInput | Input cantidad o monto |
| OrderResponse | Muestra id y status de respuesta |

### API Endpoint

```
POST https://dummy-api-topaz.vercel.app/orders
```

### Schema de Validación (Zod)

```typescript
// order.schema.ts
import { z } from 'zod';

export const orderSchema = z.object({
  side: z.enum(['BUY', 'SELL']),
  type: z.enum(['MARKET', 'LIMIT']),
  quantity: z.number().int().positive(),
  price: z.number().positive().optional(),
}).refine(
  (data) => data.type === 'MARKET' || data.price !== undefined,
  { message: 'Price is required for LIMIT orders', path: ['price'] }
);
```

### Request Body (POST)

```typescript
interface OrderRequest {
  instrument_id: number;
  side: 'BUY' | 'SELL';
  type: 'MARKET' | 'LIMIT';
  quantity: number;
  price?: number; // Solo para LIMIT
}
```

**Ejemplo body orden MARKET:**

```json
{
  "instrument_id": 1,
  "side": "BUY",
  "type": "MARKET",
  "quantity": 1234
}
```

**Ejemplo body orden LIMIT:**

```json
{
  "instrument_id": 1,
  "side": "SELL",
  "type": "LIMIT",
  "quantity": 123,
  "price": 84.5
}
```

### Response

```typescript
interface OrderResponse {
  id: string;
  status: 'PENDING' | 'FILLED' | 'REJECTED';
}
```

### Cálculo de Cantidad por Monto

```typescript
// orders.ts
export const calculateQuantityFromAmount = (
  amount: number,
  price: number
): number => {
  return Math.floor(amount / price);
};
```

---

# 10. MANEJO DE ERRORES

## 10.1 Categorías de Errores

### Errores de Red

- Sin conexión a internet
- Timeout de request

### Errores de API

- 400 Bad Request (validación)
- 404 Not Found
- 500 Server Error

### Errores de Orden

- REJECTED: Orden rechazada por el mercado

## 10.2 Estrategia de Manejo

### Nivel Global

- Interceptor de Axios para errores HTTP
- Manejo de estado loading/error en Redux slices

### Nivel de Componente

- Estados de error locales en formularios
- Feedback visual inmediato

### Estructura de Estado

```typescript
interface SliceState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}
```

## 10.3 Mensajes de Error

| Código/Situación | Mensaje Usuario |
|------------------|-----------------|
| Network Error | "Sin conexión. Verificá tu internet." |
| 400 | "Datos inválidos. Revisá el formulario." |
| 500 | "Error del servidor. Intentá más tarde." |
| REJECTED | "Orden rechazada. Verificá el monto disponible." |

## 10.4 Componente de Error

```typescript
// ErrorMessage.tsx
interface ErrorMessageProps {
  message: string;
  onRetry?: () => void;
}
```

---

# 11. TESTING

## 11.1 Estrategia de Testing

El proyecto implementa dos niveles de testing:

| Nivel | Propósito | Cobertura |
|-------|-----------|-----------|
| **Unit Tests** | Validar lógica de negocio aislada | Cálculos, formatters, schemas |
| **E2E Tests** | Validar flujos críticos de usuario | Navegación, órdenes, interacciones |

## 11.2 Unit Tests

### Archivos a Testear

| Archivo | Funciones |
|---------|-----------|
| `calculations/returns.ts` | `calculateReturn` |
| `calculations/portfolio.ts` | `calculateMarketValue`, `calculateProfit`, `calculateProfitPercentage` |
| `calculations/orders.ts` | `calculateQuantityFromAmount` |
| `formatters/currency.ts` | `formatCurrency`, `formatPercentage` |
| `schemas/order.schema.ts` | Validaciones de orden |

### Ejemplo de Test

```typescript
// calculations.test.ts
describe('calculateReturn', () => {
  it('should calculate positive return correctly', () => {
    expect(calculateReturn(110, 100)).toBe(10);
  });

  it('should calculate negative return correctly', () => {
    expect(calculateReturn(90, 100)).toBe(-10);
  });
});

describe('calculateQuantityFromAmount', () => {
  it('should floor the result (no fractional shares)', () => {
    expect(calculateQuantityFromAmount(1000, 45.72)).toBe(21);
  });
});
```

## 11.3 E2E Tests

### Flujos Críticos a Testear

Los E2E tests cubren los flujos más importantes para el usuario:

| Test | Descripción | Prioridad |
|------|-------------|-----------|
| **Visualización de Instrumentos** | La lista de instrumentos carga y muestra datos correctamente | Alta |
| **Visualización de Portfolio** | Las posiciones se muestran con cálculos correctos | Alta |
| **Búsqueda de Activos** | El buscador filtra y muestra resultados | Alta |
| **Flujo de Orden MARKET** | Usuario completa una orden MARKET exitosamente | Crítica |
| **Flujo de Orden LIMIT** | Usuario completa una orden LIMIT exitosamente | Crítica |
| **Validación de Formulario** | El formulario muestra errores de validación | Alta |
| **Navegación entre Tabs** | Usuario navega entre las 3 pantallas principales | Media |

### Especificación de E2E Tests

#### E2E-001: Instruments Screen

```
Escenario: Usuario visualiza lista de instrumentos
  Dado que la app está abierta
  Cuando el usuario está en el tab "Instruments"
  Entonces debe ver una lista de instrumentos
  Y cada instrumento muestra ticker, nombre, precio y retorno
  Y los retornos positivos se muestran en verde
  Y los retornos negativos se muestran en rojo
```

#### E2E-002: Portfolio Screen

```
Escenario: Usuario visualiza su portafolio
  Dado que la app está abierta
  Cuando el usuario navega al tab "Portfolio"
  Entonces debe ver sus posiciones
  Y cada posición muestra ticker, cantidad, valor de mercado
  Y muestra la ganancia/pérdida en pesos
  Y muestra el rendimiento en porcentaje
```

#### E2E-003: Search

```
Escenario: Usuario busca un instrumento
  Dado que el usuario está en el tab "Search"
  Cuando ingresa "DYC" en el buscador
  Y espera que se complete la búsqueda
  Entonces debe ver "DYCA" en los resultados
```

#### E2E-004: Order Flow - MARKET BUY

```
Escenario: Usuario envía orden de compra MARKET
  Dado que el usuario está en la lista de instrumentos
  Cuando hace tap en un instrumento
  Entonces se abre el modal de órdenes
  
  Cuando selecciona "BUY"
  Y selecciona "MARKET"
  Y ingresa cantidad "10"
  Y presiona "Enviar Orden"
  
  Entonces debe ver el ID de la orden
  Y el status debe ser "FILLED" o "REJECTED"
```

#### E2E-005: Order Flow - LIMIT SELL

```
Escenario: Usuario envía orden de venta LIMIT
  Dado que el modal de órdenes está abierto
  Cuando selecciona "SELL"
  Y selecciona "LIMIT"
  Y ingresa cantidad "5"
  Y ingresa precio "85.50"
  Y presiona "Enviar Orden"
  
  Entonces debe ver el ID de la orden
  Y el status debe ser "PENDING" o "REJECTED"
```

#### E2E-006: Order Validation

```
Escenario: Validación de campos requeridos
  Dado que el modal de órdenes está abierto
  Cuando selecciona "LIMIT"
  Y deja el campo precio vacío
  Y presiona "Enviar Orden"
  
  Entonces debe ver mensaje de error "Price is required for LIMIT orders"
```

#### E2E-007: Order by Amount

```
Escenario: Usuario ingresa monto en lugar de cantidad
  Dado que el modal de órdenes está abierto para instrumento con precio $45.72
  Cuando el usuario selecciona "Ingresar por monto"
  Y ingresa "$1000"
  
  Entonces el campo cantidad debe mostrar "21" (floor de 1000/45.72)
```

### Estructura de Tests E2E

```
e2e/
├── instruments.e2e.ts      # Tests de pantalla Instruments
├── portfolio.e2e.ts        # Tests de pantalla Portfolio
├── search.e2e.ts           # Tests de búsqueda
├── orders.e2e.ts           # Tests de modal y validaciones
└── flows/
    └── buy-order.e2e.ts    # Flujo completo de compra
```

---

# APÉNDICES

## A. Tipos Principales

```typescript
// order.types.ts
export type OrderSide = 'BUY' | 'SELL';
export type OrderType = 'MARKET' | 'LIMIT';
export type OrderStatus = 'PENDING' | 'FILLED' | 'REJECTED';

// Reglas de negocio:
// MARKET → FILLED | REJECTED
// LIMIT  → PENDING | REJECTED
```

## B. Constantes

```typescript
// order.constants.ts
export const ORDER_SIDES = ['BUY', 'SELL'] as const;
export const ORDER_TYPES = ['MARKET', 'LIMIT'] as const;

// api.constants.ts
export const API_BASE_URL = 'https://dummy-api-topaz.vercel.app';
export const DEBOUNCE_MS = 300;
```

## C. API Endpoints Summary

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/instruments` | Lista de instrumentos |
| GET | `/portfolio` | Posiciones del usuario |
| GET | `/search?query={ticker}` | Búsqueda por ticker |
| POST | `/orders` | Crear orden |

---
