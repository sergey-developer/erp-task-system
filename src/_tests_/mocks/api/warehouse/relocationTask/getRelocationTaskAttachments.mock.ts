import { GetRelocationTaskAttachmentsSuccessResponse } from 'modules/warehouse/models'
import { getRelocationTaskAttachmentsUrl } from 'modules/warehouse/utils/relocationTask'

import { HttpMethodEnum } from 'shared/constants/http'
import { IdType } from 'shared/types/common'

import { getRequestMockFn, getSuccessMockFn } from '_tests_/mocks/request'
import { ResponseResolverOptions } from '_tests_/mocks/response'

const getRelocationTaskAttachmentsMockFn = (relocationTaskId: IdType) =>
  getRequestMockFn(HttpMethodEnum.Get, getRelocationTaskAttachmentsUrl(relocationTaskId))

export const mockGetRelocationTaskAttachmentsSuccess = (
  relocationTaskId: IdType,
  options?: Partial<ResponseResolverOptions<GetRelocationTaskAttachmentsSuccessResponse>>,
) => getSuccessMockFn(getRelocationTaskAttachmentsMockFn(relocationTaskId), options)()
