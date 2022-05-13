import { AxiosRequestConfig } from 'axios'

import { env } from 'configs/env'

import paramsSerializer from './paramsSerializer'
import {
  toJsonTransformer,
  toSnakeCaseTransformer,
} from './requestTransformers'
import {
  fromJsonTransformer,
  fromSnakeCaseTransformer,
} from './responseTransformers'

const config: AxiosRequestConfig = {
  baseURL: env.get<string>('apiUrl'),
  headers: {
    'Content-Type': 'application/json',
  },
  transformRequest: [toSnakeCaseTransformer, toJsonTransformer],
  transformResponse: [fromJsonTransformer, fromSnakeCaseTransformer],
  paramsSerializer,
}

export default config
