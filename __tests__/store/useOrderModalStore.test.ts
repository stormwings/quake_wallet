import { useOrderModalStore } from '@/src/store/useOrderModalStore';
import { Instrument } from '@/src/types';
import { act, renderHook } from '@testing-library/react-native';

describe('useOrderModalStore', () => {
  const mockInstrument: Instrument = {
    id: 1,
    ticker: 'AAPL',
    name: 'Apple Inc.',
    type: 'ACCIONES',
    last_price: 150.25,
    close_price: 148.5,
  };

  beforeEach(() => {
    // Reset store state
    const { result } = renderHook(() => useOrderModalStore());
    act(() => {
      result.current.closeModal();
    });
  });

  it('should initialize with modal closed', () => {
    const { result } = renderHook(() => useOrderModalStore());

    expect(result.current.isVisible).toBe(false);
    expect(result.current.selectedInstrument).toBeNull();
  });

  it('should open modal with instrument', () => {
    const { result } = renderHook(() => useOrderModalStore());

    act(() => {
      result.current.openModal(mockInstrument);
    });

    expect(result.current.isVisible).toBe(true);
    expect(result.current.selectedInstrument).toEqual(mockInstrument);
  });

  it('should close modal and clear instrument', () => {
    const { result } = renderHook(() => useOrderModalStore());

    act(() => {
      result.current.openModal(mockInstrument);
      result.current.closeModal();
    });

    expect(result.current.isVisible).toBe(false);
    expect(result.current.selectedInstrument).toBeNull();
  });
});
