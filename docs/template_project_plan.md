# 📋 Plan de Proyecto: [PROJECT_NAME]

## Documentación Técnica Completa

> **Instrucciones de uso del template:**
> - Reemplaza todo texto entre `[CORCHETES]` con información específica de tu proyecto
> - Elimina secciones que no apliquen o agrégalas según necesidad
> - Los comentarios `<!-- -->` son guías, elimínalos en la versión final
> - Adapta los ejemplos de código al stack tecnológico elegido

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
10. [Especificación de API Endpoints](#10-especificación-de-api-endpoints)
11. [Estructuras de Datos](#11-estructuras-de-datos)
12. [Diseño de Componentes](#12-diseño-de-componentes)
13. [Gestión de Estado](#13-gestión-de-estado)
14. [Capa de Servicios](#14-capa-de-servicios)
15. [Sistema de Filtros y Búsqueda](#15-sistema-de-filtros-y-búsqueda)
16. [Patrones de Diseño](#16-patrones-de-diseño)
17. [Guía de Estilos y UI/UX](#17-guía-de-estilos-y-uiux)
18. [Paginación y Navegación](#18-paginación-y-navegación)
19. [Manejo de Errores](#19-manejo-de-errores)
20. [Internacionalización](#20-internacionalización)
21. [Testing](#21-testing)
22. [Plan de Implementación por Fases](#22-plan-de-implementación-por-fases)
23. [Consideraciones de Escalabilidad](#23-consideraciones-de-escalabilidad)
24. [Glosario de Términos](#24-glosario-de-términos)

---

# 1. VISIÓN GENERAL DEL PROYECTO

## 1.1 Descripción del Proyecto

<!-- Describe el proyecto en 2-3 párrafos. Incluye qué problema resuelve y su propuesta de valor -->

**[PROJECT_NAME]** es [TIPO_DE_APLICACIÓN: aplicación web/móvil/desktop] diseñada para [PROPÓSITO_PRINCIPAL]. El sistema [DESCRIPCIÓN_FUNCIONAL_BREVE].

## 1.2 Propósito

El propósito principal es [OBJETIVO_PRINCIPAL], permitiendo:

- [CAPACIDAD_1]
- [CAPACIDAD_2]
- [CAPACIDAD_3]
- [CAPACIDAD_4]
- [CAPACIDAD_5]

## 1.3 Usuarios Objetivo

<!-- Define los diferentes tipos de usuarios y sus necesidades -->

| Tipo de Usuario | Descripción | Necesidades Principales |
|-----------------|-------------|------------------------|
| **[ROL_1]** | [DESCRIPCIÓN_ROL] | [NECESIDADES] |
| **[ROL_2]** | [DESCRIPCIÓN_ROL] | [NECESIDADES] |
| **[ROL_3]** | [DESCRIPCIÓN_ROL] | [NECESIDADES] |
| **[ROL_4]** | [DESCRIPCIÓN_ROL] | [NECESIDADES] |

## 1.4 Contexto del Negocio

<!-- Describe el contexto empresarial donde operará el sistema -->

El sistema debe contemplar un negocio/contexto con las siguientes características:

- **[CARACTERÍSTICA_1]**: [DESCRIPCIÓN]
- **[CARACTERÍSTICA_2]**: [DESCRIPCIÓN]
- **[CARACTERÍSTICA_3]**: [DESCRIPCIÓN]
- **[CARACTERÍSTICA_4]**: [DESCRIPCIÓN]

---

# 2. OBJETIVOS DEL SISTEMA

## 2.1 Objetivos Generales

1. **[OBJETIVO_1]**: [DESCRIPCIÓN_DETALLADA]
2. **[OBJETIVO_2]**: [DESCRIPCIÓN_DETALLADA]
3. **[OBJETIVO_3]**: [DESCRIPCIÓN_DETALLADA]
4. **Escalabilidad**: Permitir la incorporación de nuevos módulos sin reestructuración mayor
5. **Mantenibilidad**: Facilitar el mantenimiento y evolución del código

## 2.2 Objetivos Específicos

### Funcionales
<!-- Lista las funcionalidades principales que el sistema debe cumplir -->
- [FUNCIONALIDAD_1]
- [FUNCIONALIDAD_2]
- [FUNCIONALIDAD_3]
- [FUNCIONALIDAD_4]
- [FUNCIONALIDAD_5]

### Técnicos
- Implementar arquitectura modular y escalable
- Mantener tiempos de respuesta óptimos
- Garantizar consistencia en la interfaz de usuario
- Facilitar el mantenimiento del código
- Permitir integración sencilla con nuevos endpoints

## 2.3 Métricas de Éxito

<!-- Define KPIs medibles para evaluar el éxito del proyecto -->

| Métrica | Objetivo |
|---------|----------|
| Tiempo de carga inicial | < [X] segundos |
| Tiempo de respuesta de interacciones | < [X]ms |
| Cobertura de código | > [X]% |
| Performance Score (Lighthouse) | > [X] |
| Accesibilidad (WCAG) | Nivel [AA/AAA] |
| [MÉTRICA_CUSTOM_1] | [OBJETIVO] |
| [MÉTRICA_CUSTOM_2] | [OBJETIVO] |

---

# 3. ALCANCE DEL PROYECTO

## 3.1 Dentro del Alcance

### Módulos Incluidos

<!-- Lista todos los módulos que formarán parte del sistema -->

1. **[MÓDULO_1]**
   - [FUNCIONALIDAD_1.1]
   - [FUNCIONALIDAD_1.2]
   - [FUNCIONALIDAD_1.3]

2. **[MÓDULO_2]**
   - [FUNCIONALIDAD_2.1]
   - [FUNCIONALIDAD_2.2]
   - [FUNCIONALIDAD_2.3]

3. **[MÓDULO_3]**
   - [FUNCIONALIDAD_3.1]
   - [FUNCIONALIDAD_3.2]
   - [FUNCIONALIDAD_3.3]

4. **[MÓDULO_N]**
   - [FUNCIONALIDAD_N.1]
   - [FUNCIONALIDAD_N.2]

## 3.2 Fuera del Alcance (Fase Inicial)

<!-- Define explícitamente qué NO se incluirá en esta versión -->

- [EXCLUSIÓN_1]
- [EXCLUSIÓN_2]
- [EXCLUSIÓN_3]
- [EXCLUSIÓN_4]

## 3.3 Supuestos

<!-- Lista las premisas sobre las que se basa el proyecto -->

1. [SUPUESTO_1: ej. El backend proporcionará endpoints RESTful consistentes]
2. [SUPUESTO_2: ej. Los datos vendrán en formato JSON estandarizado]
3. [SUPUESTO_3: ej. Se dispondrá de documentación de API actualizada]
4. [SUPUESTO_4: ej. El sistema operará en navegadores modernos]
5. [SUPUESTO_5]

## 3.4 Restricciones

<!-- Define las limitaciones técnicas o de negocio -->

1. [RESTRICCIÓN_1: ej. Solo operaciones de lectura (GET)]
2. [RESTRICCIÓN_2: ej. Compatibilidad con navegadores de últimas 2 versiones]
3. [RESTRICCIÓN_3]
4. [RESTRICCIÓN_4]

---

# 4. REQUISITOS FUNCIONALES

<!-- 
Nomenclatura sugerida: RF-XXX donde XXX es el número secuencial
Cada requisito debe ser específico, medible y verificable
-->

## 4.1 RF-001: [NOMBRE_MÓDULO_1]

### RF-001.1 [FUNCIONALIDAD_ESPECÍFICA]
- [REQUISITO_DETALLADO_1]
- [REQUISITO_DETALLADO_2]
- [REQUISITO_DETALLADO_3]

### RF-001.2 [FUNCIONALIDAD_ESPECÍFICA]
- [REQUISITO_DETALLADO_1]
- [REQUISITO_DETALLADO_2]

## 4.2 RF-002: [NOMBRE_MÓDULO_2]

### RF-002.1 [FUNCIONALIDAD_ESPECÍFICA]
- [REQUISITO_DETALLADO_1]
- [REQUISITO_DETALLADO_2]

### RF-002.2 [FUNCIONALIDAD_ESPECÍFICA]
- [REQUISITO_DETALLADO_1]
- [REQUISITO_DETALLADO_2]

## 4.X RF-00X: Funcionalidades Transversales

<!-- Funcionalidades que aplican a todo el sistema -->

### RF-00X.1 Sistema de Filtros
- Filtro por rango de fechas
- Filtro por [CRITERIO_1]
- Filtro por [CRITERIO_2]
- Combinación de múltiples filtros
- Guardado de filtros favoritos

### RF-00X.2 Sistema de Búsqueda
- Búsqueda global en todos los módulos
- Búsqueda específica por módulo
- Autocompletado de sugerencias

### RF-00X.3 Navegación
- Breadcrumbs para ubicación actual
- Navegación entre registros relacionados
- Historial de navegación

---

# 5. REQUISITOS NO FUNCIONALES

## 5.1 RNF-001: Rendimiento

| Aspecto | Requisito |
|---------|-----------|
| Tiempo de carga inicial | Máximo [X] segundos en conexión [TIPO] |
| Respuesta a interacciones | Máximo [X]ms |
| Renderizado de listas | Máximo [X]ms para [N] registros |
| Memoria del navegador | No exceder [X]MB en uso normal |
| Tamaño del bundle | Máximo [X]KB gzipped (inicial) |

## 5.2 RNF-002: Escalabilidad

- La arquitectura debe permitir agregar nuevos módulos sin modificar el core
- Los componentes deben ser reutilizables entre módulos
- El sistema de rutas debe soportar rutas dinámicas
- Los servicios deben ser agnósticos al módulo que los consume

## 5.3 RNF-003: Mantenibilidad

- Código debe seguir convenciones de ESLint estrictas
- Cobertura de tests mínima del [X]%
- Documentación inline en componentes complejos
- Separación clara de responsabilidades (SRP)
- Máximo [X] líneas por archivo de componente

## 5.4 RNF-004: Usabilidad

- Interfaz intuitiva sin necesidad de capacitación extensa
- Feedback visual en todas las acciones
- Estados de carga claros
- Mensajes de error comprensibles
- Responsive design ([BREAKPOINTS])
- Accesibilidad WCAG 2.1 nivel [AA/AAA]

## 5.5 RNF-005: Compatibilidad

| Navegador/Plataforma | Versiones Soportadas |
|----------------------|---------------------|
| Chrome | Últimas [X] versiones |
| Firefox | Últimas [X] versiones |
| Safari | Últimas [X] versiones |
| Edge | Últimas [X] versiones |
| [MÓVIL/OTRO] | [VERSIONES] |

## 5.6 RNF-006: Seguridad

- No almacenar datos sensibles en localStorage
- Sanitización de datos mostrados (XSS prevention)
- Headers de seguridad en requests
- Validación de datos recibidos del backend
- [REQUISITO_SEGURIDAD_ESPECÍFICO]

## 5.7 RNF-007: Disponibilidad

- Manejo graceful de errores de red
- Modo offline básico (si aplica)
- Reintentos automáticos en fallos de conexión

---

# 6. STACK TECNOLÓGICO

<!-- 
Adapta esta sección al stack específico de tu proyecto.
Incluye justificación para las decisiones principales.
-->

## 6.1 Core

| Tecnología | Versión | Propósito |
|------------|---------|-----------|
| [FRAMEWORK/LIB_PRINCIPAL] | [X.x] | [PROPÓSITO] |
| [LENGUAJE] | [X.x] | [PROPÓSITO] |
| [BUILD_TOOL] | [X.x] | [PROPÓSITO] |

## 6.2 Estilos

| Tecnología | Versión | Propósito |
|------------|---------|-----------|
| [CSS_FRAMEWORK/SOLUCIÓN] | [X.x] | [PROPÓSITO] |
| [UTILIDAD_CSS_1] | Latest | [PROPÓSITO] |

## 6.3 Estado y Data Fetching

| Tecnología | Versión | Propósito |
|------------|---------|-----------|
| [STATE_MANAGEMENT] | [X.x] | [PROPÓSITO] |
| [DATA_FETCHING_LIB] | [X.x] | [PROPÓSITO] |

## 6.4 Routing

| Tecnología | Versión | Propósito |
|------------|---------|-----------|
| [ROUTER_LIB] | [X.x] | Navegación y rutas |

## 6.5 UI Components

| Tecnología | Versión | Propósito |
|------------|---------|-----------|
| [COMPONENT_LIB] | Latest | [PROPÓSITO] |
| [ICON_LIB] | Latest | Iconografía |
| [CHART_LIB] | Latest | Gráficos y visualizaciones |

## 6.6 Formularios y Validación

| Tecnología | Versión | Propósito |
|------------|---------|-----------|
| [FORM_LIB] | [X.x] | Manejo de formularios |
| [VALIDATION_LIB] | [X.x] | Validación de schemas |

## 6.7 Utilidades

| Tecnología | Versión | Propósito |
|------------|---------|-----------|
| [DATE_LIB] | Latest | Manipulación de fechas |
| [UTILITY_LIB] | Latest | Utilidades generales |
| [HTTP_CLIENT] | Latest | Cliente HTTP |

## 6.8 Testing

| Tecnología | Versión | Propósito |
|------------|---------|-----------|
| [TEST_RUNNER] | Latest | Test runner |
| [TESTING_LIB] | Latest | Testing de componentes |
| [MOCK_LIB] | Latest | Mock de API |
| [E2E_FRAMEWORK] | Latest | E2E testing |

## 6.9 Calidad de Código

| Tecnología | Versión | Propósito |
|------------|---------|-----------|
| [LINTER] | [X.x] | Linting |
| [FORMATTER] | [X.x] | Formateo de código |
| [GIT_HOOKS] | Latest | Git hooks |

## 6.10 Justificación de Elecciones

### ¿Por qué [TECNOLOGÍA_PRINCIPAL]?
- [RAZÓN_1]
- [RAZÓN_2]
- [RAZÓN_3]

### ¿Por qué [OTRA_TECNOLOGÍA_IMPORTANTE]?
- [RAZÓN_1]
- [RAZÓN_2]
- [RAZÓN_3]

---

# 7. ARQUITECTURA DEL SISTEMA

## 7.1 Visión General de la Arquitectura

La arquitectura sigue el patrón de **[PATRÓN_ARQUITECTÓNICO]** combinado con principios de **[OTRO_PRINCIPIO]**. Esto permite:

- Alta cohesión dentro de cada módulo
- Bajo acoplamiento entre módulos
- Fácil incorporación de nuevas features
- Testing aislado por módulo

## 7.2 Capas de la Aplicación

```
┌─────────────────────────────────────────────────────────────────┐
│                        PRESENTATION LAYER                        │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐             │
│  │   Pages     │  │ Components  │  │   Layouts   │             │
│  └─────────────┘  └─────────────┘  └─────────────┘             │
├─────────────────────────────────────────────────────────────────┤
│                      APPLICATION LAYER                           │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐             │
│  │   Hooks     │  │  Contexts   │  │   Utils     │             │
│  └─────────────┘  └─────────────┘  └─────────────┘             │
├─────────────────────────────────────────────────────────────────┤
│                        DOMAIN LAYER                              │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐             │
│  │   Types     │  │  Entities   │  │  Constants  │             │
│  └─────────────┘  └─────────────┘  └─────────────┘             │
├─────────────────────────────────────────────────────────────────┤
│                    INFRASTRUCTURE LAYER                          │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐             │
│  │  Services   │  │     API     │  │    Mock     │             │
│  └─────────────┘  └─────────────┘  └─────────────┘             │
└─────────────────────────────────────────────────────────────────┘
```

## 7.3 Descripción de Capas

### Presentation Layer (Capa de Presentación)
**Responsabilidad**: Renderizado de UI y manejo de interacciones del usuario.

- **Pages**: Componentes de página que representan rutas
- **Components**: Componentes de UI reutilizables
- **Layouts**: Estructuras de página compartidas

### Application Layer (Capa de Aplicación)
**Responsabilidad**: Lógica de aplicación, coordinación entre capas.

- **Hooks**: Custom hooks que encapsulan lógica de negocio
- **Contexts**: Proveedores de estado global
- **Utils**: Funciones utilitarias puras

### Domain Layer (Capa de Dominio)
**Responsabilidad**: Definición del modelo de negocio.

- **Types**: Interfaces y tipos
- **Entities**: Modelos de dominio
- **Constants**: Valores constantes del negocio

### Infrastructure Layer (Capa de Infraestructura)
**Responsabilidad**: Comunicación con sistemas externos.

- **Services**: Servicios que consumen la API
- **API**: Configuración y cliente HTTP
- **Mock**: Datos simulados para desarrollo

## 7.4 Flujo de Datos

```
┌──────────┐    ┌──────────┐    ┌──────────┐    ┌──────────┐
│   User   │───▶│   Page   │───▶│   Hook   │───▶│ Service  │
│  Action  │    │Component │    │          │    │          │
└──────────┘    └──────────┘    └──────────┘    └──────────┘
                                                      │
                                                      ▼
┌──────────┐    ┌──────────┐    ┌──────────┐    ┌──────────┐
│    UI    │◀───│   Page   │◀───│  State/  │◀───│   API    │
│  Update  │    │Component │    │  Cache   │    │ Response │
└──────────┘    └──────────┘    └──────────┘    └──────────┘
```

## 7.5 Arquitectura de Módulos

Cada módulo de feature sigue la misma estructura interna:

```
feature/
├── components/      # Componentes específicos del módulo
├── hooks/           # Hooks específicos del módulo
├── services/        # Servicios de API del módulo
├── types/           # Tipos específicos del módulo
├── utils/           # Utilidades específicas
├── constants/       # Constantes del módulo
├── pages/           # Páginas del módulo
└── index.ts         # Barrel export
```

## 7.6 Principios Arquitectónicos

### Principio de Inversión de Dependencias
- Las capas superiores no dependen de implementaciones concretas
- Se usan interfaces/tipos para definir contratos
- Facilita el testing y cambio de implementaciones

### Principio de Responsabilidad Única
- Cada módulo/componente tiene una única razón para cambiar
- Separación clara de concerns

### Principio de Segregación de Interfaces
- Tipos e interfaces específicos por necesidad
- No forzar componentes a depender de lo que no usan

### Principio Abierto/Cerrado
- Abierto para extensión (nuevos módulos)
- Cerrado para modificación (core estable)

---

# 8. ESTRUCTURA DE CARPETAS

## 8.1 Estructura General

<!-- Adapta esta estructura al stack y necesidades específicas del proyecto -->

```
[PROJECT_NAME]/
├── public/
│   ├── favicon.ico
│   ├── logo.svg
│   └── manifest.json
│
├── src/
│   ├── app/
│   │   ├── App.tsx
│   │   ├── Router.tsx
│   │   └── Providers.tsx
│   │
│   ├── core/
│   │   ├── api/
│   │   │   ├── apiClient.ts
│   │   │   ├── apiEndpoints.ts
│   │   │   ├── interceptors.ts
│   │   │   └── index.ts
│   │   │
│   │   ├── config/
│   │   │   ├── app.config.ts
│   │   │   ├── routes.config.ts
│   │   │   └── index.ts
│   │   │
│   │   ├── constants/
│   │   │   ├── [domain].constants.ts
│   │   │   ├── ui.constants.ts
│   │   │   └── index.ts
│   │   │
│   │   ├── types/
│   │   │   ├── api.types.ts
│   │   │   ├── common.types.ts
│   │   │   └── index.ts
│   │   │
│   │   └── index.ts
│   │
│   ├── shared/
│   │   ├── components/
│   │   │   ├── ui/
│   │   │   │   ├── Button/
│   │   │   │   │   ├── Button.tsx
│   │   │   │   │   ├── Button.types.ts
│   │   │   │   │   ├── Button.test.tsx
│   │   │   │   │   └── index.ts
│   │   │   │   ├── Input/
│   │   │   │   ├── Select/
│   │   │   │   ├── Table/
│   │   │   │   ├── Card/
│   │   │   │   ├── Modal/
│   │   │   │   ├── [OTHER_UI_COMPONENTS]/
│   │   │   │   └── index.ts
│   │   │   │
│   │   │   ├── layout/
│   │   │   │   ├── Header/
│   │   │   │   ├── Sidebar/
│   │   │   │   ├── Footer/
│   │   │   │   ├── PageContainer/
│   │   │   │   └── index.ts
│   │   │   │
│   │   │   ├── data-display/
│   │   │   │   ├── DataTable/
│   │   │   │   ├── StatCard/
│   │   │   │   ├── Chart/
│   │   │   │   └── index.ts
│   │   │   │
│   │   │   ├── feedback/
│   │   │   │   ├── ErrorBoundary/
│   │   │   │   ├── LoadingState/
│   │   │   │   ├── EmptyState/
│   │   │   │   ├── Toast/
│   │   │   │   └── index.ts
│   │   │   │
│   │   │   └── index.ts
│   │   │
│   │   ├── hooks/
│   │   │   ├── useDebounce.ts
│   │   │   ├── useLocalStorage.ts
│   │   │   ├── usePagination.ts
│   │   │   ├── useFilters.ts
│   │   │   └── index.ts
│   │   │
│   │   ├── utils/
│   │   │   ├── formatters/
│   │   │   ├── validators/
│   │   │   ├── helpers/
│   │   │   └── index.ts
│   │   │
│   │   ├── contexts/
│   │   │   ├── [Context_1]/
│   │   │   ├── [Context_2]/
│   │   │   └── index.ts
│   │   │
│   │   └── index.ts
│   │
│   ├── features/
│   │   ├── [feature-1]/
│   │   │   ├── components/
│   │   │   ├── hooks/
│   │   │   ├── services/
│   │   │   ├── types/
│   │   │   ├── constants/
│   │   │   ├── pages/
│   │   │   └── index.ts
│   │   │
│   │   ├── [feature-2]/
│   │   │   └── ...
│   │   │
│   │   └── index.ts
│   │
│   ├── layouts/
│   │   ├── MainLayout/
│   │   ├── [OtherLayout]/
│   │   └── index.ts
│   │
│   ├── mocks/
│   │   ├── data/
│   │   ├── handlers/
│   │   └── server.ts
│   │
│   ├── styles/
│   │   ├── globals.css
│   │   └── [other-styles].css
│   │
│   ├── assets/
│   │   ├── images/
│   │   ├── icons/
│   │   └── fonts/
│   │
│   ├── i18n/
│   │   ├── locales/
│   │   │   ├── en.json
│   │   │   └── es.json
│   │   └── config.ts
│   │
│   └── main.tsx
│
├── tests/
│   ├── e2e/
│   ├── integration/
│   └── setup.ts
│
├── .eslintrc.js
├── .prettierrc
├── tsconfig.json
├── vite.config.ts (o config del bundler)
├── package.json
└── README.md
```

---

# 9. MÓDULOS DEL SISTEMA

<!-- 
Describe cada módulo con sus responsabilidades y componentes principales.
Adapta esta sección a los módulos específicos de tu proyecto.
-->

## 9.1 Módulo: [NOMBRE_MÓDULO_1]

### Descripción
[DESCRIPCIÓN_DEL_MÓDULO]

### Responsabilidades
- [RESPONSABILIDAD_1]
- [RESPONSABILIDAD_2]
- [RESPONSABILIDAD_3]

### Componentes Principales
| Componente | Descripción |
|------------|-------------|
| [Componente1] | [Descripción] |
| [Componente2] | [Descripción] |

### Páginas
- `[PageName]Page.tsx`: [Descripción]
- `[PageName2]Page.tsx`: [Descripción]

## 9.2 Módulo: [NOMBRE_MÓDULO_2]

<!-- Repite la estructura para cada módulo -->

---

# 10. ESPECIFICACIÓN DE API ENDPOINTS

<!-- 
Documenta todos los endpoints que el frontend consumirá.
Agrupa por módulo/recurso.
-->

## 10.1 Configuración Base

```
Base URL: [BASE_URL]
API Version: [VERSION]
Autenticación: [TIPO_AUTH]
Content-Type: application/json
```

## 10.2 Endpoints de [MÓDULO_1]

### GET /[recurso]

**Descripción**: [DESCRIPCIÓN]

**Query Parameters**:
| Parámetro | Tipo | Requerido | Descripción |
|-----------|------|-----------|-------------|
| page | number | No | Número de página |
| limit | number | No | Registros por página |
| [param] | [tipo] | [Sí/No] | [descripción] |

**Response** (200 OK):
```json
{
  "data": [],
  "meta": {
    "total": 0,
    "page": 1,
    "limit": 20,
    "totalPages": 0
  }
}
```

### GET /[recurso]/:id

**Descripción**: [DESCRIPCIÓN]

**Path Parameters**:
| Parámetro | Tipo | Descripción |
|-----------|------|-------------|
| id | string | ID del recurso |

**Response** (200 OK):
```json
{
  "data": {}
}
```

<!-- Continúa documentando todos los endpoints necesarios -->

---

# 11. ESTRUCTURAS DE DATOS

## 11.1 Tipos Comunes

```typescript
// Respuesta paginada estándar
interface PaginatedResponse<T> {
  data: T[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
  };
}

// Respuesta de error estándar
interface ErrorResponse {
  error: {
    code: string;
    message: string;
    details?: Record<string, string[]>;
  };
}

// Filtros base
interface BaseFilters {
  startDate?: string;
  endDate?: string;
  search?: string;
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}
```

## 11.2 Entidades de [MÓDULO_1]

```typescript
interface [Entity1] {
  id: string;
  // ... campos específicos
  createdAt: string;
  updatedAt: string;
}

interface [Entity1]Filters extends BaseFilters {
  // ... filtros específicos
}
```

<!-- Continúa con las estructuras de datos de cada módulo -->

---

# 12. DISEÑO DE COMPONENTES

## 12.1 Principios de Diseño

### Composición sobre Herencia
- Preferir componentes pequeños y componibles
- Usar children y render props para flexibilidad

### Props Consistentes
- Naming conventions consistentes
- Props opcionales con defaults sensatos
- Destructuring de props en la firma

### Testing First
- Componentes diseñados para ser testables
- Atributos `data-testid` o `data-cy` en elementos interactivos

## 12.2 Componentes UI Base

### Button

```typescript
interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  isDisabled?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  children: ReactNode;
  onClick?: () => void;
}
```

### Input

```typescript
interface InputProps {
  type?: 'text' | 'email' | 'password' | 'number' | 'tel';
  label?: string;
  placeholder?: string;
  error?: string;
  helperText?: string;
  isDisabled?: boolean;
  isRequired?: boolean;
  leftAddon?: ReactNode;
  rightAddon?: ReactNode;
}
```

<!-- Define interfaces para todos los componentes UI base -->

## 12.3 Componentes de Layout

### PageContainer

```typescript
interface PageContainerProps {
  title: string;
  subtitle?: string;
  breadcrumbs?: BreadcrumbItem[];
  actions?: ReactNode;
  children: ReactNode;
}
```

## 12.4 Componentes de Data Display

### DataTable

```typescript
interface DataTableProps<T> {
  data: T[];
  columns: ColumnDef<T>[];
  isLoading?: boolean;
  error?: Error | null;
  emptyMessage?: string;
  onRowClick?: (row: T) => void;
  pagination?: PaginationConfig;
  sorting?: SortingConfig;
  // Testing attributes
  'data-cy'?: string;
}
```

---

# 13. GESTIÓN DE ESTADO

## 13.1 Estrategia de Estado

| Tipo de Estado | Solución | Ejemplos |
|----------------|----------|----------|
| Estado del Servidor | [DATA_FETCHING_LIB] | Datos de API, cache |
| Estado Global UI | [STATE_SOLUTION] | Theme, sidebar, modals |
| Estado de Formularios | [FORM_LIB] | Inputs, validación |
| Estado Local | useState/useReducer | Toggle, contadores |
| Estado de URL | Router | Filtros, paginación |

## 13.2 Configuración de [DATA_FETCHING_LIB]

```typescript
// Ejemplo con TanStack Query
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutos
      cacheTime: 30 * 60 * 1000, // 30 minutos
      retry: 3,
      refetchOnWindowFocus: false,
    },
  },
});
```

## 13.3 Query Keys Factory

```typescript
export const queryKeys = {
  [module]: {
    all: ['[module]'] as const,
    lists: () => [...queryKeys.[module].all, 'list'] as const,
    list: (filters: Filters) => [...queryKeys.[module].lists(), filters] as const,
    details: () => [...queryKeys.[module].all, 'detail'] as const,
    detail: (id: string) => [...queryKeys.[module].details(), id] as const,
  },
  // ... otros módulos
};
```

## 13.4 Contexts

### [Context_Name]Context

```typescript
interface [Context_Name]State {
  // ... estado
}

interface [Context_Name]Actions {
  // ... acciones
}

const [Context_Name]Context = createContext<[Context_Name]State & [Context_Name]Actions | null>(null);

export const use[Context_Name]Context = () => {
  const context = useContext([Context_Name]Context);
  if (!context) {
    throw new Error('use[Context_Name]Context must be used within [Context_Name]Provider');
  }
  return context;
};
```

---

# 14. CAPA DE SERVICIOS

## 14.1 Configuración del Cliente HTTP

```typescript
// apiClient.ts
import axios from 'axios';

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptors
apiClient.interceptors.request.use(/* ... */);
apiClient.interceptors.response.use(/* ... */);

export { apiClient };
```

## 14.2 Estructura de Servicios

```typescript
// [module].service.ts
import { apiClient } from '@/core/api';
import type { [Entity], [Entity]Filters, PaginatedResponse } from './types';

export const [module]Service = {
  getAll: async (filters?: [Entity]Filters): Promise<PaginatedResponse<[Entity]>> => {
    const { data } = await apiClient.get('/[endpoint]', { params: filters });
    return data;
  },

  getById: async (id: string): Promise<[Entity]> => {
    const { data } = await apiClient.get(`/[endpoint]/${id}`);
    return data;
  },

  // ... otros métodos
};
```

## 14.3 Custom Hooks para Data Fetching

```typescript
// use[Module].ts
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { [module]Service } from '../services';
import { queryKeys } from '@/core/queryKeys';

export const use[Module]List = (filters?: Filters) => {
  return useQuery({
    queryKey: queryKeys.[module].list(filters),
    queryFn: () => [module]Service.getAll(filters),
  });
};

export const use[Module]Detail = (id: string) => {
  return useQuery({
    queryKey: queryKeys.[module].detail(id),
    queryFn: () => [module]Service.getById(id),
    enabled: !!id,
  });
};
```

---

# 15. SISTEMA DE FILTROS Y BÚSQUEDA

## 15.1 Arquitectura de Filtros

```
┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│   FilterBar     │────▶│ FiltersContext  │────▶│   Query Hook    │
│   Component     │     │                 │     │                 │
└─────────────────┘     └─────────────────┘     └─────────────────┘
                                                        │
                                                        ▼
┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│   FilterChips   │◀────│ URL State Sync  │◀────│    API Call     │
│   Component     │     │                 │     │                 │
└─────────────────┘     └─────────────────┘     └─────────────────┘
```

## 15.2 Sincronización con URL

Los filtros se sincronizan con la URL para permitir:
- Compartir enlaces con filtros aplicados
- Navegación con el historial del navegador
- Bookmarking de vistas filtradas

## 15.3 Tipos de Filtros

### Filtros Globales
Aplican a toda la aplicación:
- Rango de fechas
- [FILTRO_GLOBAL_1]
- Búsqueda global

### Filtros de Módulo
Específicos por módulo:
- **[Módulo_1]**: [filtros específicos]
- **[Módulo_2]**: [filtros específicos]

## 15.4 Configuración de Filtros

```typescript
interface FilterConfig {
  key: string;
  type: 'select' | 'multiSelect' | 'dateRange' | 'text' | 'number' | 'boolean';
  label: string;
  placeholder?: string;
  options?: FilterOption[];
  optionsSource?: string;
  defaultValue?: any;
  validation?: FilterValidation;
}
```

---

# 16. PATRONES DE DISEÑO

## 16.1 Patrones de Componentes

### Compound Components
Para componentes complejos con múltiples partes relacionadas.

### Render Props
Para componentes que necesitan compartir lógica pero permiten personalización del render.

### Hooks Pattern
Extracción de lógica reutilizable en custom hooks.

### Provider Pattern
Para inyección de dependencias y estado compartido.

## 16.2 Patrones de Estado

### Optimistic Updates
Para mejorar la percepción de velocidad en acciones del usuario.

### Stale-While-Revalidate
Mostrar datos en caché mientras se revalida en background.

## 16.3 Patrones de Arquitectura

### Feature Modules
Cada feature es autocontenida con sus propios componentes, hooks, servicios, tipos y tests.

### Barrel Exports
Cada carpeta exporta a través de un `index.ts` para API pública clara.

---

# 17. GUÍA DE ESTILOS Y UI/UX

## 17.1 Sistema de Diseño

### Colores

**Colores Primarios**
| Nombre | Valor | Uso |
|--------|-------|-----|
| Primary | [#HEX] | Acciones principales, enlaces |
| Primary Dark | [#HEX] | Hover de primary |
| Primary Light | [#HEX] | Backgrounds sutiles |

**Colores Semánticos**
| Nombre | Valor | Uso |
|--------|-------|-----|
| Success | [#HEX] | Éxito, completado |
| Warning | [#HEX] | Advertencias |
| Error | [#HEX] | Errores, eliminación |
| Info | [#HEX] | Información |

**Colores Neutrales**
| Nombre | Valor | Uso |
|--------|-------|-----|
| Gray 50-900 | [#HEX] | Backgrounds, textos, bordes |

### Tipografía

**Font Family**
- Primary: [FONT_NAME] (UI)
- Monospace: [FONT_NAME] (código, IDs)

**Escala Tipográfica**
| Nombre | Tamaño | Line Height | Peso |
|--------|--------|-------------|------|
| xs | 12px | 16px | 400 |
| sm | 14px | 20px | 400 |
| base | 16px | 24px | 400 |
| lg | 18px | 28px | 500 |
| xl | 20px | 28px | 600 |
| 2xl | 24px | 32px | 600 |

### Espaciado

Escala basada en [X]px:
| Token | Valor |
|-------|-------|
| spacing-1 | [X]px |
| spacing-2 | [X]px |
| ... | ... |

### Sombras y Bordes

<!-- Definir tokens de sombras y border-radius -->

## 17.2 Principios de UX

### Jerarquía Visual
1. El contenido más importante es más prominente
2. Agrupar información relacionada
3. Usar espacio en blanco efectivamente

### Feedback al Usuario
1. Estados de carga claros
2. Mensajes de error descriptivos
3. Confirmación de acciones completadas

### Accesibilidad
1. Contraste de color suficiente (WCAG AA)
2. Navegación por teclado completa
3. Textos alternativos en imágenes
4. Labels en formularios
5. Focus visible

---

# 18. PAGINACIÓN Y NAVEGACIÓN

## 18.1 Estrategias de Paginación

| Estrategia | Caso de Uso |
|------------|-------------|
| Offset-based | Navegación directa a páginas |
| Cursor-based | Scroll infinito, datasets grandes |

## 18.2 Componente de Paginación

```typescript
interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  pageSize?: number;
  onPageSizeChange?: (size: number) => void;
  showPageSizeSelector?: boolean;
  'data-cy'?: string;
}
```

---

# 19. MANEJO DE ERRORES

## 19.1 Estrategia de Errores

### Niveles de Error
1. **Errores de Red**: Timeout, sin conexión
2. **Errores de API**: 4xx, 5xx
3. **Errores de Validación**: Datos inválidos
4. **Errores de UI**: Errores de renderizado

## 19.2 Error Boundaries

```typescript
// Implementar ErrorBoundary para capturar errores de renderizado
```

## 19.3 Manejo de Errores HTTP

```typescript
// Interceptor de errores
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    // Manejar diferentes tipos de errores
    return Promise.reject(error);
  }
);
```

---

# 20. INTERNACIONALIZACIÓN

## 20.1 Configuración

```typescript
// Si el proyecto requiere i18n
```

## 20.2 Estructura de Archivos de Traducción

```
src/i18n/
├── locales/
│   ├── en/
│   │   ├── common.json
│   │   └── [module].json
│   └── es/
│       ├── common.json
│       └── [module].json
└── config.ts
```

---

# 21. TESTING

## 21.1 Estrategia de Testing

| Tipo | Herramienta | Cobertura Objetivo |
|------|-------------|-------------------|
| Unit | [TEST_RUNNER] | [X]% |
| Integration | [TESTING_LIB] | [X]% |
| E2E | [E2E_FRAMEWORK] | Flujos críticos |

## 21.2 Estructura de Tests

```
src/
├── features/
│   └── [module]/
│       └── components/
│           └── [Component]/
│               ├── [Component].tsx
│               └── [Component].test.tsx
│
tests/
├── e2e/
│   └── [module].spec.ts
└── setup.ts
```

## 21.3 Convenciones de Testing

### Unit Tests
- Un archivo de test por componente/función
- Nombrar tests descriptivamente
- Usar `data-cy` o `data-testid` para selectores

### E2E Tests
- Cubrir flujos críticos de usuario
- Usar datos de prueba consistentes
- Implementar page objects si es necesario

---

# 22. PLAN DE IMPLEMENTACIÓN POR FASES

<!-- 
Adapta las fases según la duración y complejidad del proyecto.
Cada fase debe tener objetivos, tareas y entregables claros.
-->

## 22.1 Fase 1: Setup y Fundamentos (Semana 1-2)

### Objetivos
- Configurar proyecto base
- Implementar estructura de carpetas
- Configurar herramientas de desarrollo

### Tareas
1. Inicializar proyecto con [BUILD_TOOL]
2. Configurar TypeScript
3. Configurar ESLint y Prettier
4. Configurar [CSS_SOLUTION]
5. Implementar estructura base de carpetas
6. Configurar rutas básicas
7. Crear componentes UI base

### Entregables
- Proyecto configurado y funcionando
- Estructura de carpetas implementada
- Componentes UI base

## 22.2 Fase 2: Core y Servicios (Semana 3-4)

### Objetivos
- Implementar capa de servicios
- Configurar estado global
- Implementar layouts principales

### Tareas
1. Configurar cliente HTTP
2. Implementar interceptors
3. Crear servicios base
4. Configurar [DATA_FETCHING_LIB]
5. Implementar contexts globales
6. Crear layouts principales
7. Configurar sistema de mocks

### Entregables
- Capa de servicios funcional
- Sistema de estado configurado
- Layouts principales

## 22.3 Fase 3-N: Módulos de Features

<!-- Detalla cada fase de desarrollo de features -->

### Fase 3: [MÓDULO_1] (Semana X-Y)
- Objetivos
- Tareas
- Entregables

### Fase 4: [MÓDULO_2] (Semana X-Y)
- Objetivos
- Tareas
- Entregables

## 22.X Fase Final: Polish y Optimización

### Objetivos
- Optimizar rendimiento
- Mejorar UX
- Completar tests

### Tareas
1. Optimizar bundle size
2. Implementar lazy loading
3. Mejorar accesibilidad
4. Completar tests E2E
5. Documentar componentes
6. Bug fixing

### Entregables
- Aplicación optimizada
- Documentación completa
- Suite de tests completa

---

# 23. CONSIDERACIONES DE ESCALABILIDAD

## 23.1 Agregar Nuevos Módulos

### Pasos para Agregar un Módulo

1. **Crear estructura de carpetas**
```
src/features/nuevo-modulo/
├── components/
├── hooks/
├── services/
├── types/
├── constants/
├── pages/
└── index.ts
```

2. **Definir tipos** - Crear interfaces para entidades y filtros

3. **Crear servicio** - Implementar métodos de API

4. **Crear hooks** - Implementar hooks con [DATA_FETCHING_LIB]

5. **Crear componentes** - Reutilizar componentes compartidos

6. **Registrar rutas** - Agregar al router y navegación

7. **Agregar mocks** - Crear datos mock y handlers

8. **Agregar tests** - Unit, integration y E2E

### Checklist de Nuevo Módulo

- [ ] Estructura de carpetas creada
- [ ] Tipos definidos
- [ ] Servicio implementado
- [ ] Hooks implementados
- [ ] Componentes creados
- [ ] Páginas implementadas
- [ ] Rutas registradas
- [ ] Navegación actualizada
- [ ] Mocks creados
- [ ] Tests escritos
- [ ] Documentación actualizada

## 23.2 Agregar Nuevos Endpoints

1. Agregar método al servicio correspondiente
2. Crear/actualizar tipos si es necesario
3. Agregar query key al factory
4. Crear hook si es necesario
5. Actualizar mocks
6. Agregar tests

## 23.3 Feature Flags (Opcional)

Sistema de feature flags para:
- Despliegue gradual de features
- A/B testing
- Funcionalidad por usuario/rol

---

# 24. GLOSARIO DE TÉRMINOS

## Términos de Negocio

| Término | Definición |
|---------|------------|
| [TÉRMINO_1] | [DEFINICIÓN] |
| [TÉRMINO_2] | [DEFINICIÓN] |
| [TÉRMINO_3] | [DEFINICIÓN] |

## Términos Técnicos

| Término | Definición |
|---------|------------|
| Endpoint | URL de acceso a un recurso de la API |
| Query Key | Identificador único para queries en [DATA_FETCHING_LIB] |
| Stale Time | Tiempo antes de considerar datos desactualizados |
| Code Splitting | División del código en chunks más pequeños |
| Tree Shaking | Eliminación de código no utilizado |

## Acrónimos

| Acrónimo | Significado |
|----------|-------------|
| API | Application Programming Interface |
| CRUD | Create, Read, Update, Delete |
| UI | User Interface |
| UX | User Experience |
| SPA | Single Page Application |
| E2E | End to End |
| SRP | Single Responsibility Principle |
| DRY | Don't Repeat Yourself |

---

# ANEXOS

## Anexo A: Configuración de [CSS_FRAMEWORK]

```javascript
// Ejemplo: tailwind.config.js
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: { /* ... */ },
      },
      fontFamily: { /* ... */ },
    },
  },
  plugins: [],
};
```

## Anexo B: Scripts de Package.json

```json
{
  "scripts": {
    "dev": "[COMANDO_DEV]",
    "build": "[COMANDO_BUILD]",
    "preview": "[COMANDO_PREVIEW]",
    "lint": "[COMANDO_LINT]",
    "lint:fix": "[COMANDO_LINT_FIX]",
    "format": "[COMANDO_FORMAT]",
    "test": "[COMANDO_TEST]",
    "test:coverage": "[COMANDO_TEST_COVERAGE]",
    "test:e2e": "[COMANDO_E2E]",
    "type-check": "[COMANDO_TYPECHECK]"
  }
}
```

## Anexo C: Configuración de IDE Recomendada

```json
// .vscode/settings.json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "[FORMATTER_EXTENSION]",
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  }
}
```

## Anexo D: Variables de Entorno

```bash
# .env.example
VITE_API_URL=http://localhost:3000/api
VITE_APP_NAME=[PROJECT_NAME]
VITE_APP_VERSION=1.0.0
# Agregar otras variables necesarias
```

---

# NOTAS ADICIONALES

<!-- 
Espacio para notas específicas del proyecto que no encajen en otras secciones.
-->

- Incluir atributos `data-cy` en elementos interactivos para facilitar E2E testing
- [NOTA_2]
- [NOTA_3]

---

> **Última actualización**: [FECHA]
> **Versión del documento**: 1.0
> **Autor**: [AUTOR]
