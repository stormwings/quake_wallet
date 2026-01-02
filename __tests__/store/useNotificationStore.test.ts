import { useNotificationStore } from '@/src/store/useNotificationStore';
import { act, renderHook } from '@testing-library/react-native';

describe('useNotificationStore', () => {
  beforeEach(() => {
    // Reset store state
    const { result } = renderHook(() => useNotificationStore());
    act(() => {
      result.current.setHasUnreadNews(true);
    });
  });

  it('should initialize with unread news', () => {
    const { result } = renderHook(() => useNotificationStore());
    expect(result.current.hasUnreadNews).toBe(true);
    expect(result.current.lastViewedNewsTimestamp).toBeNull();
  });

  it('should mark news as read', () => {
    const { result } = renderHook(() => useNotificationStore());

    act(() => {
      result.current.markNewsAsRead();
    });

    expect(result.current.hasUnreadNews).toBe(false);
    expect(result.current.lastViewedNewsTimestamp).toBeGreaterThan(0);
  });

  it('should set unread news state', () => {
    const { result } = renderHook(() => useNotificationStore());

    act(() => {
      result.current.setHasUnreadNews(false);
    });

    expect(result.current.hasUnreadNews).toBe(false);

    act(() => {
      result.current.setHasUnreadNews(true);
    });

    expect(result.current.hasUnreadNews).toBe(true);
  });
});
