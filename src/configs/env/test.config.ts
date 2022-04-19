import commonConfig, { CommonKeysUnion } from './common.config'
import { ConfigType } from './interfaces'

export type TestKeysUnion = CommonKeysUnion

const testConfig: ConfigType = commonConfig

export default testConfig
