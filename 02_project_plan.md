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
- Mostrar para cada posición: ticker, cantidad

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

### RF-004.4 Validaciones

- Cantidad debe ser mayor a 0
- Precio límite requerido solo para órdenes LIMIT
- Precio límite debe ser mayor a 0

---

# 5. REQUISITOS NO FUNCIONALES

## 5.2 RNF-002: Mantenibilidad

- Separación clara por capas (layer-first)
- Tipado estricto con TypeScript
- Unit tests en lógica de cálculos y validaciones
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
| Jest | Test runner |
| React Native Testing Library | Testing de componentes |

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
└── __tests__/
    ├── utils/
    │   ├── calculations.test.ts
    │   └── formatters.test.ts
    │
    └── components/
        └── OrderForm.test.tsx
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

### Datos Requeridos (API Response)

```typescript
interface Instrument {
  ticker: string;
  name: string;
  last_price: number;
  close_price: number;
}
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

### Datos Requeridos (API Response)

```typescript
interface Position {
  ticker: string;
  quantity: number;
  avg_cost_price: number;
  last_price: number;
}
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

### Lógica

- Debounce de 300ms en input
- Filtro case-insensitive por ticker
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
  instrument_id: string;
  side: 'BUY' | 'SELL';
  type: 'MARKET' | 'LIMIT';
  quantity: number;
  price?: number; // Solo para LIMIT
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
export const API_BASE_URL = 'https://api.example.com';
export const DEBOUNCE_MS = 300;
```

## C. Tests Prioritarios

| Archivo | Cobertura |
|---------|-----------|
| calculations/returns.ts | calculateReturn |
| calculations/portfolio.ts | calculateMarketValue, calculateProfit, calculateProfitPercentage |
| calculations/orders.ts | calculateQuantityFromAmount |
| schemas/order.schema.ts | Validación de órdenes |

---

> **Nota**: Este documento corresponde al MVP. Funcionalidades adicionales como News, E2E testing, y Design System se considerarán en futuras iteraciones.
