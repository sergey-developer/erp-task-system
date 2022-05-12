import { LoginApiArg } from '../../../modules/auth/models'

export type ErrorValidation<T> = {
  [key in keyof T]: string[]
}

export type Error<T> = ErrorValidation<T> & {
  detail?: string
}

export type ErrorResponse<T> = {
  data: Error<T>
  status: number
}

export function getErrorDetail<T>(e: ErrorResponse<T>): string {
  return e && (e.data?.detail ?? '')
}
