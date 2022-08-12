import isArray from 'shared/utils/array/isArray'

import { ErrorResponse, ValidationErrors } from './intefraces'

export function getErrorDetail<T>(e: ErrorResponse<T>): ValidationErrors {
  const detail = e.data?.detail ?? []
  return isArray(detail) ? detail : [detail]
}
