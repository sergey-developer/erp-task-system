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
  get<T extends ParsedValueUnion>(key: ConfigKeysUnion): T
}

class EnvConfig implements IEnvConfig {
  private static instance: EnvConfig
  private readonly config: ValidatedConfigType

  private validate = (config: ConfigType): ValidatedConfigType => {
    for (const [key, value] of Object.entries(config)) {
      if (value === undefined) {
        throw new Error(`Missing key "${key}" in process.env`)
      }
    }

    return config as ValidatedConfigType
  }

  private constructor(configs: ConfigsType) {
    const env = process.env.NODE_ENV
    const rawConfig = configs[env] || configs.development

    this.config = this.validate(rawConfig)
    this.isDevelopment = env === 'development'
  }

  public readonly isDevelopment: boolean

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
