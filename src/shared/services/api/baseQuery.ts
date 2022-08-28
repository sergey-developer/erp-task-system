import { AxiosError } from 'axios'
import _isPlainObject from 'lodash/isPlainObject'

import { HttpMethodEnum, HttpStatusCodeEnum } from 'shared/constants/http'
import { UNKNOWN_SERVER_ERROR_MSG } from 'shared/constants/messages'

import httpClient from './httpClient'
import { CustomBaseQueryConfig, CustomBaseQueryFn } from './intefraces'

const baseQuery =
  ({
    prepareHeaders,
    apiVersion,
    apiPath,
  }: CustomBaseQueryConfig): CustomBaseQueryFn =>
  async ({ url, method = HttpMethodEnum.GET, data, params }, api) => {
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
      const status = error.response?.status
      const errorData = error.response?.data

      return {
        error: {
          status,
          data: _isPlainObject(errorData)
            ? errorData
            : {
                detail:
                  status === HttpStatusCodeEnum.ServerError
                    ? [UNKNOWN_SERVER_ERROR_MSG]
                    : error.message,
              },
        },
      }
    }
  }

export default baseQuery
