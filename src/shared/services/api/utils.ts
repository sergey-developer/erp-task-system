import { ErrorResponse, ValidationErrors } from './intefraces'

export function getErrorDetail<T>(e: ErrorResponse<T>): ValidationErrors {
  return e.data?.detail ?? []
}
