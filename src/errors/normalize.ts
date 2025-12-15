import axios from "axios";
import { ZodError } from "zod";
import type { AppError, ErrorContext } from "./types";
import { buildDefaultMessage, buildHttpError } from "./messages";

function isAppError(err: unknown): err is AppError {
  return (
    !!err &&
    typeof err === "object" &&
    "kind" in err &&
    "code" in err &&
    "message" in err &&
    "retryable" in err
  );
}

export function toAppError(err: unknown, context?: ErrorContext): AppError {
  // 1) Ya normalizado
  if (isAppError(err)) {
    return context
      ? { ...err, context: { ...(err.context ?? {}), ...context } }
      : err;
  }

  // 2) Zod (validación)
  if (err instanceof ZodError) {
    const base = buildDefaultMessage("VALIDATION", "VALIDATION_ERROR");
    return {
      kind: "VALIDATION",
      code: "VALIDATION_ERROR",
      ...base,
      details: err.issues,
      cause: err,
      context,
    };
  }

  // 3) Axios
  if (axios.isAxiosError(err)) {
    // cancel
    if ((err as any)?.code === "ERR_CANCELED") {
      const base = buildDefaultMessage("CANCELLED", "CANCELLED");
      return {
        kind: "CANCELLED",
        code: "CANCELLED",
        ...base,
        cause: err,
        context,
      };
    }

    // timeout
    if ((err as any)?.code === "ECONNABORTED") {
      const base = buildDefaultMessage("TIMEOUT", "TIMEOUT");
      return { kind: "TIMEOUT", code: "TIMEOUT", ...base, cause: err, context };
    }

    // response (HTTP)
    if (err.response) {
      const status = err.response.status;
      const mapped = buildHttpError(status, err.response.data);
      return {
        kind: "HTTP",
        code: mapped.code,
        status,
        message: mapped.message,
        i18nKey: mapped.i18nKey,
        retryable: mapped.retryable,
        details: err.response.data,
        cause: err,
        context,
      };
    }

    // request (network)
    if (err.request) {
      const base = buildDefaultMessage("NETWORK", "NETWORK_ERROR");
      return {
        kind: "NETWORK",
        code: "NETWORK_ERROR",
        ...base,
        cause: err,
        context,
      };
    }

    // fallback axios
    const base = buildDefaultMessage("UNKNOWN", "UNKNOWN");
    return {
      kind: "UNKNOWN",
      code: "UNKNOWN",
      ...base,
      details: { axiosMessage: err.message },
      cause: err,
      context,
    };
  }

  // 4) Error nativo / unknown
  const base = buildDefaultMessage("UNKNOWN", "UNKNOWN");
  const msg = err instanceof Error ? err.message : null;

  return {
    kind: "UNKNOWN",
    code: "UNKNOWN",
    ...base,
    details: msg ? { message: msg } : undefined,
    cause: err,
    context,
  };
}

export function getUserMessage(err: unknown): string {
  return toAppError(err).message;
}
