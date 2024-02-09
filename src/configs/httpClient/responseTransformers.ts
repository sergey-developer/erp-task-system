import { AxiosResponseTransformer } from 'axios'
import { camelizeKeys } from 'humps'
import flow from 'lodash/flow'

import { checkReasonExist } from 'modules/task/utils/taskSuspendRequest'

import { hasJsonContentType } from './utils'

const fromJsonTransformer: AxiosResponseTransformer = (data, headers) => {
  console.log({ headers, data })
  return hasJsonContentType(headers) ? JSON.parse(data) : data
}

const skipCamelize = flow(checkReasonExist)

const fromSnakeCaseTransformer: AxiosResponseTransformer = (data, headers) => {
  return hasJsonContentType(headers)
    ? camelizeKeys(data, (key, convert, options) =>
        skipCamelize(key) ? key : convert(key, options),
      )
    : data
}

export { fromJsonTransformer, fromSnakeCaseTransformer }
