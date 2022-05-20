import { ConfigType } from './interfaces'

export type CommonKeysUnion = 'env' | 'apiUrl'

const commonConfig: ConfigType = {
  env: process.env.NODE_ENV,
  apiUrl: process.env.REACT_APP_API_URL,
}

export default commonConfig
