import { AxiosError } from 'axios'
import isPlainObject from 'lodash/isPlainObject'

import { commonApiMessages } from 'shared/constants/errors'
import { HttpCodeEnum, HttpMethodEnum } from 'shared/constants/http'

import httpClient from './httpClient'
import { CustomBaseQueryConfig, CustomBaseQueryFn } from './intefraces'
import { makeRelativeApiUrl } from './utils'

const baseQuery =
  ({
    basePath,
    apiVersion,
    prepareHeaders,
  }: CustomBaseQueryConfig): CustomBaseQueryFn =>
  async ({ url, method = HttpMethodEnum.Get, data, params }, api) => {
    const headers = prepareHeaders
      ? prepareHeaders(
          data instanceof FormData
            ? {
                ...httpClient.defaults.headers.common,
                'Content-Type': 'multipart/form-data',
              }
            : httpClient.defaults.headers.common,
          api,
        )
      : undefined

    try {
      const response = await httpClient({
        url: makeRelativeApiUrl(url, basePath, apiVersion),
        method,
        data,
        params,
        headers,
      })
      return { data: response.data }
    } catch (exception) {
      const error = exception as AxiosError
      const status = error.response?.status || HttpCodeEnum.ServerError
      const errorData = error.response?.data

      return {
        error: {
          status,
          data: isPlainObject(errorData)
            ? errorData
            : { detail: commonApiMessages.unknownError },
        },
      }
    }
  }

export default baseQuery
