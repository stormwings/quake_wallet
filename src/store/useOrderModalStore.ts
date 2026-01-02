import { create } from 'zustand';
import { Instrument } from '../types';

interface OrderModalState {
  isVisible: boolean;
  selectedInstrument: Instrument | null;
  openModal: (instrument: Instrument) => void;
  closeModal: () => void;
}

export const useOrderModalStore = create<OrderModalState>((set) => ({
  isVisible: false,
  selectedInstrument: null,
  openModal: (instrument) =>
    set({ isVisible: true, selectedInstrument: instrument }),
  closeModal: () => set({ isVisible: false, selectedInstrument: null }),
}));
