import commonConfig, { CommonKeysUnion } from './common.config'
import { ConfigType } from './interfaces'

export type DevelopmentKeysUnion = CommonKeysUnion

const developmentConfig: ConfigType = commonConfig

export default developmentConfig
