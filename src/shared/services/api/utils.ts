import inRange from 'lodash/inRange'
import isArray from 'lodash/isArray'
import isString from 'lodash/isString'

import { env } from 'configs/env'
import { HttpCodeEnum } from 'shared/constants/http'
import { isEqual } from 'shared/utils/common/isEqual'
import makeString from 'shared/utils/string/makeString'

import { apiPath, currentApiVersion } from './constants'
import { ApiVersionUnion, ErrorResponse, ValidationErrors } from './intefraces'

export function getErrorDetail<T extends object>(
  e: ErrorResponse<T>,
): ValidationErrors {
  const detail = e.data?.detail
  return isArray(detail) ? detail : isString(detail) ? [detail] : []
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
