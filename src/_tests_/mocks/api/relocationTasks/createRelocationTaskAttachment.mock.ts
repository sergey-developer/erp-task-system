import { makeCreateRelocationTaskAttachmentApiPath } from 'features/relocationTasks/api/helpers'
import { CancelRelocationTaskResponse } from 'features/relocationTasks/api/schemas'

import { HttpMethodEnum } from 'shared/constants/http'
import { IdType } from 'shared/types/common'

import { getRequestMockFn, getSuccessMockFn } from '_tests_/mocks/api/request'
import { ResponseResolverOptions } from '_tests_/mocks/api/response'

const createRelocationTaskAttachmentMockFn = (id: IdType) =>
  getRequestMockFn(HttpMethodEnum.Post, makeCreateRelocationTaskAttachmentApiPath(id))

export const mockCreateRelocationTaskAttachmentSuccess = (
  id: IdType,
  options?: Partial<ResponseResolverOptions<CancelRelocationTaskResponse>>,
) => getSuccessMockFn(createRelocationTaskAttachmentMockFn(id), options)()
