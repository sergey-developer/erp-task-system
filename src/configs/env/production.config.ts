import commonConfig, { CommonKeysUnion } from './common.config'
import { ConfigType } from './interfaces'

export type ProductionKeysUnion = CommonKeysUnion

const productionConfig: ConfigType = commonConfig

export default productionConfig
