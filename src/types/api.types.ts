export interface ApiError {
  message: string;
  code?: number;
}

export interface SliceState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}
