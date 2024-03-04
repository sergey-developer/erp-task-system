import { AxiosError } from 'axios'
import isArray from 'lodash/isArray'
import isPlainObject from 'lodash/isPlainObject'
import merge from 'lodash/merge'

import httpClient from 'lib/httpClient'

import { commonApiMessages } from 'shared/constants/common'
import { HttpCodeEnum, HttpMethodEnum } from 'shared/constants/http'

import { CustomBaseQueryConfig, CustomBaseQueryFn } from './types'
import { makeRelativeApiUrl } from './utils'

const baseQuery =
  ({ basePath, apiVersion, prepareHeaders }: CustomBaseQueryConfig): CustomBaseQueryFn =>
  async ({ url, method = HttpMethodEnum.Get, data, params, headers }, api) => {
    const finalHeaders = prepareHeaders
      ? merge(
          prepareHeaders(
            data instanceof FormData
              ? {
                  ...httpClient.defaults.headers.common,
                  'Content-Type': 'multipart/form-data',
                }
              : httpClient.defaults.headers.common,
            api,
          ),
          headers,
        )
      : undefined

    try {
      const response = await httpClient({
        url: makeRelativeApiUrl(url, basePath, apiVersion),
        method,
        data,
        params,
        headers: finalHeaders,
      })

      return { data: response.data, meta: { response } }
    } catch (exception) {
      const error = exception as AxiosError
      const status = error.response?.status || HttpCodeEnum.ServerError
      const errorData = error.response?.data

      return {
        error: {
          status,
          data: isPlainObject(errorData)
            ? errorData
            : isArray(errorData)
            ? { errorList: errorData }
            : { detail: [commonApiMessages.unknownError] },
        },
      }
    }
  }

export default baseQuery
