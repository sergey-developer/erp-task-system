import { isTruthy } from './isTruthy'

export const valueOrHyphen = <T>(value: T): T | '-' =>
  isTruthy(value) ? value : '-'
