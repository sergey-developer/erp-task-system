import defaultTo from 'lodash/defaultTo'

export const valueOrHyphen = (value: any) => defaultTo(value, '-')
