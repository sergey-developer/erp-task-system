import _isArray from 'lodash/isArray'
import _isString from 'lodash/isString'

import { ErrorResponse, ValidationErrors } from './intefraces'

export function getErrorDetail<T>(e: ErrorResponse<T>): ValidationErrors {
  const detail = e.data?.detail
  return _isArray(detail) ? detail : _isString(detail) ? [detail] : []
}
