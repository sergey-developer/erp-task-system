import _isEqual from 'lodash/isEqual'
import _negate from 'lodash/negate'

export const isEqual = _isEqual
export const isNotEqual = _negate(isEqual)
