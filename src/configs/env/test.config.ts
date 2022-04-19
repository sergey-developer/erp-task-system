import commonConfig, { CommonKeysUnion } from './common.config'
import { BaseConfig } from './interfaces'

export type TestKeysUnion = CommonKeysUnion

const testConfig: BaseConfig = commonConfig

export default testConfig
