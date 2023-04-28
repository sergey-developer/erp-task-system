import inRange from 'lodash/inRange'
import isArray from 'lodash/isArray'
import isNumber from 'lodash/isNumber'
import isObject from 'lodash/isObject'
import isString from 'lodash/isString'

import { env } from 'configs/env'

import { HttpCodeEnum } from 'shared/constants/http'
import { hasProperty } from 'shared/utils/common'
import { isEqual } from 'shared/utils/common/isEqual'
import { makeString } from 'shared/utils/string'

import { apiPath, currentApiVersion } from './constants'
import { ApiVersionUnion, ErrorResponse, ValidationErrors } from './intefraces'

export function getErrorDetail<T extends object>(
  error: ErrorResponse<T>,
): ValidationErrors {
  const detail = error.data?.detail
  return isArray(detail) ? detail : isString(detail) ? [detail] : []
}

export const isErrorResponse = (
  response: unknown,
): response is ErrorResponse => {
  if (!isObject(response)) {
    return false
  }

  return !!(
    hasProperty(response, 'status') &&
    isNumber(response.status) &&
    hasProperty(response, 'data') &&
    isObject(response.data)
  )
}

export const getRelativeApiUrl = (
  basePath: string = apiPath,
  apiVersion: ApiVersionUnion = currentApiVersion,
): string => makeString('/', basePath, apiVersion)

export const makeRelativeApiUrl = (
  path: string,
  basePath: string = apiPath,
  apiVersion: ApiVersionUnion = currentApiVersion,
): string => makeString('', getRelativeApiUrl(basePath, apiVersion), path)

export const makeAbsoluteApiUrl = (
  path: string,
  basePath: string = apiPath,
  apiVersion: ApiVersionUnion = currentApiVersion,
): string =>
  makeString(
    '',
    env.get<string>('apiUrl'),
    makeRelativeApiUrl(path, basePath, apiVersion),
  )

export const isServerRangeError = (error: ErrorResponse): boolean =>
  inRange(
    error.status,
    HttpCodeEnum.ServerError,
    HttpCodeEnum.InvalidSSLCertificate,
  )

export const isClientRangeError = (error: ErrorResponse): boolean =>
  inRange(
    error.status,
    HttpCodeEnum.BadRequest,
    HttpCodeEnum.ClientClosedRequest,
  )

export const isNotFoundError = (error: ErrorResponse): boolean =>
  isEqual(error.status, HttpCodeEnum.NotFound)

export const isBadRequestError = (error: ErrorResponse): boolean =>
  isEqual(error.status, HttpCodeEnum.BadRequest)

export const isUnauthorizedError = (error: ErrorResponse): boolean =>
  isEqual(error.status, HttpCodeEnum.Unauthorized)

export const isForbiddenError = (error: ErrorResponse): boolean =>
  isEqual(error.status, HttpCodeEnum.Forbidden)
