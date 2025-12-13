export interface Instrument {
  id: number;
  ticker: string;
  name: string;
  type: 'ACCIONES' | 'MONEDA';
  last_price: number;
  close_price: number;
}
