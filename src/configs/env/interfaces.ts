import { MaybeUndefined } from 'shared/interfaces/utils'

export type Environment = 'development' | 'production' | 'test'

export type ParsedEnvConfigValue = string | number | boolean

export type ConfigType = Record<string, MaybeUndefined<ParsedEnvConfigValue>>
