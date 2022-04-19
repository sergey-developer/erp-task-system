import developmentConfig, { DevelopmentKeysUnion } from './development.config'
import { BaseConfig, EnvUnion, ParsedValueUnion } from './interfaces'
import productionConfig, { ProductionKeysUnion } from './production.config'
import testConfig, { TestKeysUnion } from './test.config'

type Configs = Record<EnvUnion, BaseConfig>

const configs: Configs = {
  development: developmentConfig,
  production: productionConfig,
  test: testConfig,
}

type ConfigKeysUnion =
  | DevelopmentKeysUnion
  | ProductionKeysUnion
  | TestKeysUnion

type ValidatedConfig = Record<string, ParsedValueUnion>

interface IEnvConfig {
  get<T extends ParsedValueUnion>(key: ConfigKeysUnion): T
}

class EnvConfig implements IEnvConfig {
  private static instance: EnvConfig
  private readonly config: ValidatedConfig

  private validate = (config: BaseConfig): ValidatedConfig => {
    for (const [key, value] of Object.entries(config)) {
      if (value === undefined) {
        throw new Error(`Missing key "${key}" in process.env`)
      }
    }

    return config as ValidatedConfig
  }

  private constructor(configs: Configs) {
    const env = process.env.NODE_ENV
    const rawConfig = configs[env] || configs.development
    this.config = this.validate(rawConfig)
  }

  public static getInstance = (configs: Configs): EnvConfig => {
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
