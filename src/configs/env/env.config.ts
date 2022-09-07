import _isUndefined from 'lodash/isUndefined'

import { Keys } from 'shared/interfaces/utils'
import { isEqual } from 'shared/utils/common/isEqual'

import commonConfig from './common.config'
import developmentConfig, { DevelopmentKeysUnion } from './development.config'
import { ConfigType, EnvUnion, ParsedValueUnion } from './interfaces'
import productionConfig, { ProductionKeysUnion } from './production.config'
import testConfig, { TestKeysUnion } from './test.config'

type ConfigsType = Record<EnvUnion, ConfigType>

const configs: ConfigsType = {
  development: developmentConfig,
  production: productionConfig,
  test: testConfig,
}

type ConfigKeysUnion =
  | DevelopmentKeysUnion
  | ProductionKeysUnion
  | TestKeysUnion

type ValidatedConfigType = Record<string, ParsedValueUnion>

interface IEnvConfig {
  isDevelopment: boolean
  isProduction: boolean
  get<T extends ParsedValueUnion>(key: ConfigKeysUnion): T
}

class EnvConfig implements IEnvConfig {
  private static instance: EnvConfig
  private readonly config: ValidatedConfigType

  private validate = (config: ConfigType): ValidatedConfigType => {
    for (const [key, value] of Object.entries(config)) {
      if (_isUndefined(value)) {
        throw new Error(`Missing key "${key}" in process.env`)
      }
    }

    return config as ValidatedConfigType
  }

  private constructor(configs: ConfigsType) {
    const env = commonConfig.env as Keys<ConfigsType>
    const rawConfig = configs[env] || configs.development

    this.config = this.validate(rawConfig)
    this.isDevelopment = isEqual(env, 'development')
    this.isProduction = isEqual(env, 'production')
  }

  public readonly isDevelopment: boolean
  public readonly isProduction: boolean

  public static getInstance = (configs: ConfigsType): EnvConfig => {
    if (!EnvConfig.instance) {
      EnvConfig.instance = new EnvConfig(configs)
    }

    return EnvConfig.instance
  }

  public get<T extends ParsedValueUnion>(key: ConfigKeysUnion): T {
    return this.config[key] as T
  }
}

const config = EnvConfig.getInstance(configs)

export default config
