import _isEqualDeep from 'lodash/isEqual'

export const isEqualDeep = _isEqualDeep
export const isEqual = (value1: any, value2: any): boolean => value1 === value2
