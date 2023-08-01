import { commonConfig, CommonConfigKeys } from './common.config'
import { ConfigType } from './interfaces'

export type ProductionEnvConfigKeys = CommonConfigKeys

export const productionConfig: ConfigType = commonConfig
