import defaultTo from 'lodash/defaultTo'

export const valueOrHyphen = <T>(value: T): T | '-' => defaultTo(value, '-')
