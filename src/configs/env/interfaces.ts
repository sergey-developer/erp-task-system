import { MaybeUndefined } from 'shared/interfaces/utils'

export type EnvUnion = 'development' | 'production' | 'test'

export type ParsedValueUnion = string | number | boolean

export type ConfigType = Record<string, MaybeUndefined<ParsedValueUnion>>
