import commonConfig, { CommonKeysUnion } from './common.config'
import { BaseConfig } from './interfaces'

export type ProductionKeysUnion = CommonKeysUnion

const productionConfig: BaseConfig = commonConfig

export default productionConfig
