import isEqual from 'lodash/isEqual'

import { commonConfig } from './common.config'
import {
  developmentConfig,
  DevelopmentEnvConfigKeys,
} from './development.config'
import { ConfigType, Environment, ParsedEnvConfigValue } from './types'
import { productionConfig, ProductionEnvConfigKeys } from './production.config'
import { testConfig, TestEnvConfigKeys } from './test.config'

type ConfigsType = Record<Environment, ConfigType>

const configs: ConfigsType = {
  development: developmentConfig,
  production: productionConfig,
  test: testConfig,
}

type EnvConfigKeys =
  | DevelopmentEnvConfigKeys
  | ProductionEnvConfigKeys
  | TestEnvConfigKeys

type ValidatedEnvConfig = Record<string, ParsedEnvConfigValue>

interface IEnvConfig {
  isDevelopment: boolean
  isProduction: boolean
  isTest: boolean

  get<T extends ParsedEnvConfigValue>(key: EnvConfigKeys): T
}

class EnvConfig implements IEnvConfig {
  private static instance: EnvConfig
  private readonly config: ValidatedEnvConfig

  private validate = (config: ConfigType): ValidatedEnvConfig => {
    for (const [key, value] of Object.entries(config)) {
      if (typeof value === 'undefined') {
        throw new Error(`Missing key "${key}" in process.env`)
      }
    }

    return config as ValidatedEnvConfig
  }

  private constructor(configs: ConfigsType) {
    const env = commonConfig.env as keyof ConfigsType
    const config = configs[env] || configs.development

    this.config = this.validate(config)
    this.isDevelopment = isEqual(env, 'development')
    this.isProduction = isEqual(env, 'production')
    this.isTest = isEqual(env, 'test')
  }

  public readonly isDevelopment: boolean
  public readonly isProduction: boolean
  public readonly isTest: boolean

  public static getInstance = (configs: ConfigsType): EnvConfig => {
    if (!EnvConfig.instance) {
      EnvConfig.instance = new EnvConfig(configs)
    }

    return EnvConfig.instance
  }

  public get<T extends ParsedEnvConfigValue>(key: EnvConfigKeys): T {
    return this.config[key] as T
  }
}

export const env = EnvConfig.getInstance(configs)
