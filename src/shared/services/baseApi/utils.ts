import head from 'lodash/head'
import inRange from 'lodash/inRange'
import isEqual from 'lodash/isEqual'
import isNumber from 'lodash/isNumber'
import isObject from 'lodash/isObject'
import isString from 'lodash/isString'

import { env } from 'configs/env'

import { HttpCodeEnum } from 'shared/constants/http'
import { MaybeUndefined } from 'shared/types/utils'
import { hasProperty } from 'shared/utils/common'
import { makeString } from 'shared/utils/string'

import { apiPath, currentApiVersion } from './constants'
import { ApiVersionUnion, ErrorDataDetail, ErrorResponse, ValidationErrors } from './types'

const makeErrorDetailArr = (detail: ErrorDataDetail): ValidationErrors =>
  isString(detail) ? [detail] : detail

// todo: применить везде где можно
export const getErrorDetail = <T extends object>(error: ErrorResponse<T>): ValidationErrors => {
  const detail = error.data?.detail
  return detail ? makeErrorDetailArr(detail) : []
}

const makeErrorDetailStr = (detail: ErrorDataDetail): MaybeUndefined<string> =>
  isString(detail) ? detail : head(detail)

export const getErrorDetailStr = <T extends object>(
  error: ErrorResponse<T>,
): MaybeUndefined<string> =>
  error.data?.detail ? makeErrorDetailStr(error.data.detail) : undefined

export const isErrorResponse = (response: unknown): response is ErrorResponse => {
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
  makeString('', env.get<string>('apiUrl'), makeRelativeApiUrl(path, basePath, apiVersion))

export const isServerRangeError = (error: Pick<ErrorResponse, 'status'>): boolean =>
  inRange(error.status, HttpCodeEnum.ServerError, HttpCodeEnum.InvalidSSLCertificate)

export const isClientRangeError = (error: Pick<ErrorResponse, 'status'>): boolean =>
  inRange(error.status, HttpCodeEnum.BadRequest, HttpCodeEnum.ClientClosedRequest)

export const isNotFoundError = (error: Pick<ErrorResponse, 'status'>): boolean =>
  isEqual(error.status, HttpCodeEnum.NotFound)

export const isBadRequestError = (error: Pick<ErrorResponse, 'status'>): boolean =>
  isEqual(error.status, HttpCodeEnum.BadRequest)

export const isUnauthorizedError = (error: Pick<ErrorResponse, 'status'>): boolean =>
  isEqual(error.status, HttpCodeEnum.Unauthorized)

export const isForbiddenError = (error: Pick<ErrorResponse, 'status'>): boolean =>
  isEqual(error.status, HttpCodeEnum.Forbidden)
