import axios from 'axios'

import { env } from 'configs/env'

import { toJsonTransformer } from './requestTransformers'
import { fromJsonTransformer } from './responseTransformers'

const httpClient = axios.create({
  baseURL: env.get<string>('apiUrl'),
  headers: {
    'Content-Type': 'application/json',
  },
  transformRequest: [toJsonTransformer],
  transformResponse: [fromJsonTransformer],
})

export default httpClient
