export type AppErrorKind =
  | "HTTP"
  | "NETWORK"
  | "TIMEOUT"
  | "CANCELLED"
  | "VALIDATION"
  | "UNKNOWN";

export type AppErrorCode =
  | "BAD_REQUEST"
  | "UNAUTHORIZED"
  | "FORBIDDEN"
  | "NOT_FOUND"
  | "RATE_LIMITED"
  | "SERVER_ERROR"
  | "HTTP_ERROR"
  | "NETWORK_ERROR"
  | "TIMEOUT"
  | "CANCELLED"
  | "VALIDATION_ERROR"
  | "UNKNOWN";

export type ErrorContext = Record<string, unknown>;

export type AppError = {
  kind: AppErrorKind;
  code: AppErrorCode;

  /** Mensaje user-friendly (MVP). En el futuro puede venir de i18n usando i18nKey. */
  message: string;

  /** i18n ready (no hace falta usarlo ahora, pero lo deja listo). */
  i18nKey: string;
  i18nParams?: Record<string, unknown>;

  status?: number;
  retryable: boolean;

  details?: unknown;
  cause?: unknown;
  context?: ErrorContext;
};
