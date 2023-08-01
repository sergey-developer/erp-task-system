import { ConfigType } from './types'

export type CommonConfigKeys = 'env' | 'apiUrl'

export const commonConfig: ConfigType = {
  env: process.env.REACT_APP_ENVIRONMENT,
  apiUrl: process.env.REACT_APP_API_URL,
}
