import { AxiosRequestConfig } from 'axios'

import { env } from 'configs/env'

import { toJsonTransformer } from './requestTransformers'
import { fromJsonTransformer } from './responseTransformers'

const config: AxiosRequestConfig = {
  baseURL: env.get<string>('apiUrl'),
  headers: {
    'Content-Type': 'application/json',
  },
  transformRequest: [toJsonTransformer],
  transformResponse: [fromJsonTransformer],
}

export default config
