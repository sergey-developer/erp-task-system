import flow from 'lodash/flow'

import getContentType from './getContentType'
import isJsonContentType from './isJsonContentType'

const hasJsonContentType = flow([getContentType, isJsonContentType])

export default hasJsonContentType
