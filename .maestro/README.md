# Maestro E2E

## Alcance
- Navegación y carga de tabs: Instruments, Portfolio, Search.
- Flujos de listado y refresh de instrumentos.
- Portafolio: resumen y cards con valores/calculados.
- Búsqueda por ticker.
- Modal de órdenes: BUY/SELL, MARKET/LIMIT, cálculos y envío (incluye flujos completos en `flows/` para buy market y sell limit).

## Requisitos
- Maestro CLI instalado (ver doc oficial).
- Expo dev server activo: `npm run start` con dispositivo/emulador (appId `host.exp.exponent`, Expo Go).
- Backend esperado: `API_URL=https://dummy-api-topaz.vercel.app` (configurado en `.maestro/config.yaml`).

## Cómo ejecutar
```bash
# ejecutar todos los tests del folder .maestro
maestro test .maestro

# ejecutar un archivo específico
maestro test .maestro/instruments.yaml
maestro test .maestro/portfolio.yaml
maestro test .maestro/search.yaml
maestro test .maestro/orders.yaml

# flujos completos
maestro test .maestro/flows/complete-buy-order.yaml
maestro test .maestro/flows/complete-sell-limit-order.yaml
```

## Estructura
- `config.yaml`: appId y env (`API_URL`).
- Flows raíz: `instruments.yaml`, `portfolio.yaml`, `search.yaml`, `orders.yaml`.
- Flows compuestos en `flows/`: escenarios end-to-end de órdenes.
