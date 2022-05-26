import axios, { AxiosError } from 'axios'

import { httpClientConfig } from 'configs/httpClient'
import { HttpMethodEnum } from 'shared/constants/http'

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
      const result = await httpClient({
        url: `${apiPath}/${apiVersion}${url}`,
        method,
        data,
        params,
        headers,
      })
      return { data: result.data }
    } catch (axiosError) {
      let err = axiosError as AxiosError

      return {
        error: {
          status: err.response?.status,
          data: err.response?.data || err.message,
        },
      }
    }
  }

export default baseQuery
