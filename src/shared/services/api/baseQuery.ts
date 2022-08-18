import axios, { AxiosError } from 'axios'
import _isPlainObject from 'lodash/isPlainObject'

import { httpClientConfig } from 'configs/httpClient'
import { HttpMethodEnum, HttpStatusCodeEnum } from 'shared/constants/http'

import { CustomBaseQueryConfig, CustomBaseQueryFn } from './intefraces'

const httpClient = axios.create(httpClientConfig)

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
                    ? ['Неизвестная ошибка сервера']
                    : error.message,
              },
        },
      }
    }
  }

export default baseQuery
