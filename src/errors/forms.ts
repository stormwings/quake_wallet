/**
 * MVP: helper para React Hook Form (FieldError / unknown)
 * Evita repetir `errors.x?.message` y deja el lugar listo para i18n.
 */
export function getFieldErrorMessage(fieldError: unknown): string | null {
  if (!fieldError) return null;
  if (typeof fieldError === "string") return fieldError;
  const maybeMessage = (fieldError as any)?.message;
  return typeof maybeMessage === "string" && maybeMessage.trim()
    ? maybeMessage
    : null;
}
