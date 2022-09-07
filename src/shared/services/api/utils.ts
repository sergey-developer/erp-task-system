import _inRange from 'lodash/inRange'
import _isArray from 'lodash/isArray'
import _isString from 'lodash/isString'

import { env } from 'configs/env'
import { HttpStatusCodeEnum } from 'shared/constants/http'
import { isEqual } from 'shared/utils/common/isEqual'
import makeString from 'shared/utils/string/makeString'

import { apiPath, currentApiVersion } from './constants'
import { ApiVersionUnion, ErrorResponse, ValidationErrors } from './intefraces'

export function getErrorDetail<T>(e: ErrorResponse<T>): ValidationErrors {
  const detail = e.data?.detail
  return _isArray(detail) ? detail : _isString(detail) ? [detail] : []
}

export const getRelativeApiUrl = (
  apiVersion: ApiVersionUnion = currentApiVersion,
): string => makeString('/', apiPath, apiVersion)

export const makeRelativeApiUrl = (
  path: string,
  apiVersion: ApiVersionUnion = currentApiVersion,
): string => makeString('', getRelativeApiUrl(apiVersion), path)

export const makeAbsoluteApiUrl = (
  path: string,
  apiVersion: ApiVersionUnion = currentApiVersion,
): string =>
  makeString(
    '',
    env.get<string>('apiUrl'),
    makeRelativeApiUrl(path, apiVersion),
  )

export const isServerRangeError = (error: ErrorResponse): boolean =>
  _inRange(
    error.status,
    HttpStatusCodeEnum.ServerError,
    HttpStatusCodeEnum.InvalidSSLCertificate,
  )

export const isClientRangeError = (error: ErrorResponse): boolean =>
  _inRange(
    error.status,
    HttpStatusCodeEnum.BadRequest,
    HttpStatusCodeEnum.ClientClosedRequest,
  )

export const isNotFoundError = (error: ErrorResponse): boolean =>
  isEqual(error.status, HttpStatusCodeEnum.NotFound)

export const isBadRequestError = (error: ErrorResponse): boolean =>
  isEqual(error.status, HttpStatusCodeEnum.BadRequest)
