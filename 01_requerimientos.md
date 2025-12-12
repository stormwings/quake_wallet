## instruments: 
- La pantalla deberá mostrar el listado de instrumentos obtenidos por este endpoint.
  Mostrar ticker, nombre, ultimo precio y retorno (calculado usando el ultimo precio y el precio de cierre que devuelve el mismo endpoint)

## portfolio:
- La pantalla deberá mostrar el listado de activos que devuelve el endpoint.
  Para cada uno de ellos mostrar el ticker, la cantidad de la posicion, el valor de mercado, la ganancia y rendimiento total (user el avg_cost_price como valor de compra)

## search:
- Desarrollar un buscador de activos por ticker.

## orders:
Al hacer click en algun instrumento mostrar un modal con un formulario para enviar una orden (el metodo es un POST).
  - Un usuario deberia poder definir si es una orden de compra o venta (BUY o SELL)
  - El tipo de orden es MARKET o LIMIT, la cantidad de acciones a enviar y, solo si el tipo de orden es LIMIT, el precio a enviar.

  - La respuesta del POST va a tener un id y un status que puede ser PENDING, REJECTED o FILLED.
  - Mostrar el id y status que devolvió. (Abajo hay un ejemplo de los parametro a enviar en el body del post)

Al enviar una orden, es necesario enviar la cantidad de acciones que quiere comprar o vender
  - Permitir al usuario enviar la cantidad de acciones exactas o sino...
  - Un monto total de inversión en pesos (en este caso, calcular la cantidad de acciones máximas que puede enviar utilizando el ultimos precio, no se admiten fracciones de acciones).

  - Cuando un usuario manda una order de tipo LIMIT, el estado de la orden devuelto es PENDING o REJECTED.
  - Cuando un usuario manda una order de tipo MARKET, el estado de la orden devuelto es REJECTED o FILLED.

  - Para calcular el valor de mercado de una posicion del portafolio usar quantity * last_price. 
    Tener en cuenta que el parametro avg_cost_price es el precio de compra promedio, utilizarlo para calcular la ganancia (valor absoluto $) y rendimiento (%) total.

Status de las Orders:
  **PENDING** - cuando una orden LIMIT es enviada al mercado, se envía con este estado.
  **FILLED** - cuando una orden se ejecuta. Las ordenes market son ejecutadas inmediatamente al ser enviadas.
  **REJECTED** - cuando la orden es rechazada por el mercado ya que no cumple con los requerimientos, como por ejemplo cuando se envía una orden por un monto mayor al disponible.

### Notas:
  - Precios de activos en pesos
  - Documentacion + Doc tecnica & desarrollo
  - Estructura: diseñar una arquitectura que facilite el mantenimiento y la escalabilidad.
  - Manejo de errores: implementar un enfoque robusto para gestionar fallos en la aplicación.
  - Unit test donde sea necesario

  - Cualquier funcionalidad adicional que implementes será considerada un punto a favor.
    - News - section
    - Maestro - e2e testing
    - RNUI - design system
    - Dinero.js - currencies
    - Zod - validaciones

## Arquitectura
  - Layer-first
  - Redux basico
  - Typescript
  - Expo
  - React Navigation (core + native stack + bottom tabs)
  - React Hook Form
  