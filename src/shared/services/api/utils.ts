import { DetailError, ErrorResponse } from './intefraces'

export function getErrorDetail<T>(e: ErrorResponse<T>): DetailError {
  return e.data?.detail ?? []
}
