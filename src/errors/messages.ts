import type { AppError, AppErrorCode, AppErrorKind } from "./types";

function safeServerMessage(data: unknown): string | null {
  // MVP: aceptamos solo strings cortos y "limpios"
  const msg = (data as any)?.message;
  if (typeof msg !== "string") return null;
  const trimmed = msg.trim();
  if (!trimmed) return null;
  if (trimmed.length > 160) return null;
  if (trimmed.includes("\n")) return null;
  return trimmed;
}

export function buildHttpError(
  status: number,
  data?: unknown
): Pick<AppError, "code" | "i18nKey" | "message" | "retryable"> {
  const serverMsg = safeServerMessage(data);

  // MVP: preferimos mensajes nuestros salvo que el server mande uno corto y razonable
  if (serverMsg) {
    return {
      code: "HTTP_ERROR" as const,
      i18nKey: "errors.http",
      message: serverMsg,
      retryable: status >= 500 || status === 429,
    };
  }

  if (status === 400)
    return {
      code: "BAD_REQUEST" as const,
      i18nKey: "errors.badRequest",
      message: "La solicitud es inválida.",
      retryable: false,
    };
  if (status === 401)
    return {
      code: "UNAUTHORIZED" as const,
      i18nKey: "errors.unauthorized",
      message: "Tu sesión expiró. Volvé a iniciar sesión.",
      retryable: false,
    };
  if (status === 403)
    return {
      code: "FORBIDDEN" as const,
      i18nKey: "errors.forbidden",
      message: "No tenés permisos para esta acción.",
      retryable: false,
    };
  if (status === 404)
    return {
      code: "NOT_FOUND" as const,
      i18nKey: "errors.notFound",
      message: "No se encontró lo que buscabas.",
      retryable: false,
    };
  if (status === 429)
    return {
      code: "RATE_LIMITED" as const,
      i18nKey: "errors.rateLimited",
      message: "Demasiadas solicitudes. Probá de nuevo en unos segundos.",
      retryable: true,
    };
  if (status >= 500)
    return {
      code: "SERVER_ERROR" as const,
      i18nKey: "errors.server",
      message: "El servidor tuvo un problema. Probá más tarde.",
      retryable: true,
    };

  return {
    code: "HTTP_ERROR" as const,
    i18nKey: "errors.http",
    message: "Ocurrió un error al procesar la solicitud.",
    retryable: false,
  };
}

export function buildDefaultMessage(
  kind: AppErrorKind,
  code: AppErrorCode
): Pick<AppError, "message" | "i18nKey" | "retryable"> {
  switch (kind) {
    case "NETWORK":
      return {
        message: "No se pudo conectar. Revisá tu conexión a internet.",
        i18nKey: "errors.network",
        retryable: true,
      };
    case "TIMEOUT":
      return {
        message: "La solicitud tardó demasiado. Probá de nuevo.",
        i18nKey: "errors.timeout",
        retryable: true,
      };
    case "CANCELLED":
      return {
        message: "La solicitud fue cancelada.",
        i18nKey: "errors.cancelled",
        retryable: true,
      };
    case "VALIDATION":
      return {
        message: "Hay datos inválidos. Revisá los campos.",
        i18nKey: "errors.validation",
        retryable: false,
      };
    default:
      return {
        message: "Ocurrió un error inesperado. Probá de nuevo.",
        i18nKey: "errors.generic",
        retryable: true,
      };
  }
}
