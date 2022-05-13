import { ErrorResponse } from './intefraces'

export function getErrorDetail<T>(e: ErrorResponse<T>): string {
  return e?.data?.detail ?? ''
}
