import commonConfig, { CommonKeysUnion } from './common.config'
import { BaseConfig } from './interfaces'

export type DevelopmentKeysUnion = CommonKeysUnion

const developmentConfig: BaseConfig = commonConfig

export default developmentConfig
