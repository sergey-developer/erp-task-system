import _flow from 'lodash/flow'

import getContentType from './getContentType'
import isJsonContentType from './isJsonContentType'

const hasJsonContentType = _flow([getContentType, isJsonContentType])

export default hasJsonContentType
