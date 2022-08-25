import _isArray from 'lodash/isArray'
import _isString from 'lodash/isString'

import { env } from 'configs/env'

import { apiPath, currentApiVersion } from './constants'
import { ApiVersionUnion, ErrorResponse, ValidationErrors } from './intefraces'

export function getErrorDetail<T>(e: ErrorResponse<T>): ValidationErrors {
  const detail = e.data?.detail
  return _isArray(detail) ? detail : _isString(detail) ? [detail] : []
}

export const getApiUrl = (
  apiVersion: ApiVersionUnion = currentApiVersion,
): string => `${env.get('apiUrl')}${apiPath}/${apiVersion}`

export const makeApiUrl = (
  path: string,
  apiVersion: ApiVersionUnion = currentApiVersion,
): string => `${getApiUrl(apiVersion)}/${path}`
