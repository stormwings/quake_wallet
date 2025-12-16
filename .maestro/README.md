# Maestro E2E Tests - Quake Wallet

Este directorio contiene los tests End-to-End usando Maestro para la aplicación Quake Wallet.

## Prerequisitos

### Software Requerido

1. **Node.js y npm** - Para instalar dependencias y correr el proyecto
2. **Expo CLI** - Ya incluido en el proyecto
3. **Maestro CLI** - Para ejecutar los tests E2E
4. **Emulador o Dispositivo Físico**:
   - **Android**: Android Studio con emulador configurado o dispositivo físico con USB debugging
   - **iOS**: Xcode con simulador (solo macOS) o dispositivo físico

### Instalación de Maestro

```bash
# macOS
brew tap mobile-dev-inc/tap
brew install maestro

# Linux/WSL
curl -Ls "https://get.maestro.mobile.dev" | bash

# Windows
# Usar WSL o instalar desde https://maestro.mobile.dev
```

Verificar instalación:
```bash
maestro --version
```

## Preparación del Entorno

### Paso 1: Instalar Dependencias del Proyecto

```bash
# En la raíz del proyecto
npm install
```

### Paso 2: Configurar y Levantar Emulador/Dispositivo

**Para Android:**
```bash
# Verificar dispositivos disponibles
adb devices

# Si usas emulador, levántalo desde Android Studio o:
emulator -avd <nombre_del_emulador>
```

**Para iOS (solo macOS):**
```bash
# Listar simuladores disponibles
xcrun simctl list devices

# Levantar un simulador específico
xcrun simctl boot "iPhone 15"
```

### Paso 3: Levantar la Aplicación

```bash
# Android
npm run android

# iOS
npm run ios
```

**Importante**: Espera a que la app se compile y se abra en el emulador/dispositivo antes de ejecutar los tests. Verifica que:
- La app se abre correctamente
- Muestra el tab "Instrumentos" por defecto
- La lista de instrumentos carga datos de la API

### Paso 4: Verificar Conexión de Maestro

```bash
# Maestro debe detectar el dispositivo/emulador
maestro test --no-start .maestro/instruments.yaml --dry-run
```

## Ejecutar Tests

### Tests Individuales por Módulo
```bash
# Instruments screen
maestro test .maestro/instruments.yaml

# Portfolio screen
maestro test .maestro/portfolio.yaml

# Search screen
maestro test .maestro/search.yaml

# Order modal & form
maestro test .maestro/orders.yaml
```

### Tests de Flujos Completos
```bash
# Flujo completo de compra
maestro test .maestro/flows/complete-buy-order.yaml

# Flujo completo de venta con LIMIT
maestro test .maestro/flows/complete-sell-limit-order.yaml

```

## Estructura de Tests

### 📁 Estructura del Directorio

```
.maestro/
├── config.yaml                        # Configuración compartida (appId, env vars)
├── .maestro.yaml                      # Configuración de la suite de tests
├── README.md                          # Esta documentación
│
├── instruments.yaml                   #  Test del módulo Instruments
├── portfolio.yaml                     #  Test del módulo Portfolio
├── search.yaml                        #  Test del módulo Search
├── orders.yaml                        #  Test del módulo Orders
│
└── flows/                             #  Flujos completos end-to-end
    ├── complete-buy-order.yaml        #  Flow: Buscar → Comprar → Verificar
    └── complete-sell-limit-order.yaml #  Flow: Portfolio → Vender LIMIT
```

## Mejores Prácticas Implementadas

### 🎯 Reglas Fundamentales de Testing

#### 1. **NUNCA verificar copy/textos que pueden cambiar con i18n**

```yaml
# ❌ MAL: Verificar texto que puede cambiar con traducciones
- assertVisible:
    text: "Instrumentos"

- assertVisible:
    text: "Bienvenido"

# ✅ BIEN: Usar testID
- assertVisible:
    id: "instruments-screen"

- assertVisible:
    id: "welcome-message"
```

**Por qué:**
- Los textos cambian con i18n/traducciones
- Los copy pueden cambiar por decisiones de producto
- Los testIDs son estables y semánticos

**Excepciones permitidas:**
- Textos de navegación del sistema que no cambian (tabs, headers nativos)
- Solo como fallback cuando no hay testID disponible

#### 2. **Priorizar testID sobre todo lo demás**

```yaml
# Prioridad 1: testID (PREFERIDO)
- tapOn:
    id: "order-form-submit"

# Prioridad 2: testID con regex (cuando el ID es dinámico)
- tapOn:
    id: "instrument-card-.*"
    index: 0

# Prioridad 3: Texto estático del sistema (EVITAR)
- tapOn:
    text: "OK"  # Solo para diálogos del sistema

# ❌ NUNCA: Texto de la app
- tapOn:
    text: "Comprar"  # Puede cambiar con i18n
```

**Ventajas de testID:**
- Inmune a cambios de copy
- Inmune a traducciones i18n
- Más rápido que regex o búsqueda de texto
- Más explícito y legible
- Compatible con múltiples herramientas de testing

#### 3. **Verificar estructura, no contenido**

```yaml
# ✅ BIEN: Verificar que el elemento existe
- assertVisible:
    id: "instrument-card-ticker"

- assertVisible:
    id: "instrument-card-price"

# ❌ MAL: Verificar el contenido específico
- assertVisible:
    text: "AAPL"  # El ticker puede cambiar

- assertVisible:
    text: "$150.00"  # El precio cambia constantemente
```

#### 4. **Organizar tests en secciones lógicas**

```yaml
# =============================================================================
# 1. LAUNCH & INITIAL LOAD
# =============================================================================

- launchApp
- assertVisible:
    id: "instruments-screen"

# =============================================================================
# 2. VERIFICAR CARGA DE DATOS
# =============================================================================

- assertVisible:
    id: "instrument-card-.*"
```

**Beneficios:**
- Fácil de entender el flujo del test
- Fácil de mantener y actualizar
- Fácil de debuggear cuando falla

#### 5. **Verificar múltiples instancias con índices**

```yaml
# Verificar que hay múltiples elementos
- assertVisible:
    id: "instrument-card-.*"
    index: 0

- assertVisible:
    id: "instrument-card-.*"
    index: 1

- assertVisible:
    id: "instrument-card-.*"
    index: 2
```

#### 6. **Usar assertNotVisible para verificar cierres**

```yaml
# Cerrar modal
- tapOn:
    id: "order-modal-close"

# Verificar que ya NO está visible
- assertNotVisible:
    id: "order-modal"
```

#### 7. **Testear interacciones múltiples**

No solo testear el happy path, sino múltiples interacciones:

```yaml
# Abrir modal desde primer instrumento
- tapOn:
    id: "instrument-card-.*"
    index: 0

# Cerrar
- tapOn:
    id: "order-modal-close"

# Abrir modal desde SEGUNDO instrumento
- tapOn:
    id: "instrument-card-.*"
    index: 1

# Cerrar de otra forma (backdrop)
- tapOn:
    point: "50%,10%"
```

#### 8. **Verificar cada elemento de componentes complejos**

Para componentes con múltiples elementos, verificar cada parte:

```yaml
# InstrumentCard tiene múltiples elementos
- assertVisible:
    id: "instrument-card-ticker"
    index: 0

- assertVisible:
    id: "instrument-card-name"
    index: 0

- assertVisible:
    id: "instrument-card-price"
    index: 0

- assertVisible:
    id: "instrument-card-return"
    index: 0

- assertVisible:
    id: "instrument-card-icon"
    index: 0
```

#### 9. **Incluir pull-to-refresh y scroll en tests**

```yaml
# Pull-to-refresh (swipe desde arriba hacia abajo)
- swipe:
    start: 50%, 20%
    end: 50%, 80%

- waitForAnimationToEnd:
    timeout: 3000

# Scroll normal (por defecto hacia abajo)
- scroll

- assertVisible:
    id: "instrument-card-.*"
    index: 5

# Scroll múltiple
- scroll
- scroll
```

#### 10. **Timeouts apropiados**

```yaml
# Animaciones rápidas: 1000ms
- waitForAnimationToEnd:
    timeout: 1000

# Inicialización de app: 3000ms
- waitForAnimationToEnd:
    timeout: 3000

# Llamadas a API: 5000ms
- waitForAnimationToEnd:
    timeout: 5000
```

### 🎯 Uso de testID

Todos los componentes tienen `testID` properties para identificación confiable:

```yaml
# ✅ BUENO: Usar testID
- tapOn:
    id: "instrument-card-AAPL"

# ⚠️ EVITAR: Usar texto que puede cambiar
- tapOn:
    text: "Apple Inc."
```

**Ventajas:**
- ✅ Más estable que buscar por texto
- ✅ No se rompe si cambia el copy o traducciones (i18n-proof)
- ✅ Funciona tanto en Maestro como en React Native Testing Library
- ✅ Más rápido que regex patterns

### 📝 Convenciones de Nombres de testID

```
{module}-{component}-{element}-{modifier?}

Ejemplos:
- instrument-card-AAPL          # Card con ticker dinámico
- order-type-buy                # Botón BUY
- order-form-submit             # Botón submit del formulario
- portfolio-total-value         # Texto del valor total
- search-input                  # Input de búsqueda
```

### 🏗️ Organización de Tests

1. **Tests por Módulo**: Un archivo por screen/módulo principal
   - Fácil de mantener
   - Tests aislados y rápidos
   - Útil para desarrollo incremental

2. **Tests de Flows**: Flujos completos end-to-end
   - Verifican integración entre módulos
   - Simulan comportamiento real de usuario
   - Más lentos pero más completos

3. **Separación Clara**:
   - Módulos en raíz: `.maestro/*.yaml`
   - Flows en carpeta: `.maestro/flows/*.yaml`
