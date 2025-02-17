import { makeGetRelocationTaskAttachmentsApiPath } from 'features/relocationTasks/api/helpers'
import { GetRelocationTaskAttachmentsResponse } from 'features/relocationTasks/api/schemas'

import { HttpMethodEnum } from 'shared/constants/http'
import { IdType } from 'shared/types/common'

import { getRequestMockFn, getSuccessMockFn } from '_tests_/mocks/api/request'
import { ResponseResolverOptions } from '_tests_/mocks/api/response'

const getRelocationTaskAttachmentsMockFn = (relocationTaskId: IdType) =>
  getRequestMockFn(HttpMethodEnum.Get, makeGetRelocationTaskAttachmentsApiPath(relocationTaskId))

export const mockGetRelocationTaskAttachmentsSuccess = (
  relocationTaskId: IdType,
  options?: Partial<ResponseResolverOptions<GetRelocationTaskAttachmentsResponse>>,
) => getSuccessMockFn(getRelocationTaskAttachmentsMockFn(relocationTaskId), options)()
