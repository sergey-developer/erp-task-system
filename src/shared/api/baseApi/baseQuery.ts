import { AxiosError } from 'axios'
import isArray from 'lodash/isArray'
import isPlainObject from 'lodash/isPlainObject'

import httpClient from 'lib/httpClient'

import { commonApiErrorMessage } from 'shared/constants/common'
import { HttpCodeEnum, HttpMethodEnum } from 'shared/constants/http'
import { MimetypeEnum } from 'shared/constants/mimetype'

import { CustomBaseQueryConfig, CustomBaseQueryFn } from './types'
import { makeRelativeApiUrl } from './utils'

const baseQuery =
  ({ basePath, apiVersion }: CustomBaseQueryConfig): CustomBaseQueryFn =>
  async ({ url, method = HttpMethodEnum.Get, data, params, headers }) => {
    try {
      const response = await httpClient({
        url: makeRelativeApiUrl(url, basePath, apiVersion),
        method,
        data,
        params,
        headers: {
          ...(headers
            ? !headers['Accept'] && { Accept: MimetypeEnum.Json }
            : { Accept: MimetypeEnum.Json }),
        },
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
            : { detail: [commonApiErrorMessage] },
        },
      }
    }
  }

export default baseQuery
