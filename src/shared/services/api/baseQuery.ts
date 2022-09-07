import { AxiosError } from 'axios'
import isPlainObject from 'lodash/isPlainObject'

import { HttpCodeEnum, HttpMethodEnum } from 'shared/constants/http'
import { UNKNOWN_ERROR_MSG } from 'shared/constants/messages'

import httpClient from './httpClient'
import { CustomBaseQueryConfig, CustomBaseQueryFn } from './intefraces'

const baseQuery =
  ({
    prepareHeaders,
    apiVersion,
    apiPath,
  }: CustomBaseQueryConfig): CustomBaseQueryFn =>
  async ({ url, method = HttpMethodEnum.Get, data, params }, api) => {
    const headers = prepareHeaders
      ? prepareHeaders(httpClient.defaults.headers.common, api)
      : undefined

    try {
      const response = await httpClient({
        url: `${apiPath}/${apiVersion}${url}`,
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
            : { detail: UNKNOWN_ERROR_MSG },
        },
      }
    }
  }

export default baseQuery
