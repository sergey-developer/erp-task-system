import { CancelRelocationTaskResponse } from 'features/warehouse/models'
import { createRelocationTaskAttachmentUrl } from 'features/warehouse/utils/relocationTask'

import { HttpMethodEnum } from 'shared/constants/http'
import { IdType } from 'shared/types/common'

import { getRequestMockFn, getSuccessMockFn } from '_tests_/mocks/request'
import { ResponseResolverOptions } from '_tests_/mocks/response'

const createRelocationTaskAttachmentMockFn = (id: IdType) =>
  getRequestMockFn(HttpMethodEnum.Post, createRelocationTaskAttachmentUrl(id))

export const mockCreateRelocationTaskAttachmentSuccess = (
  id: IdType,
  options?: Partial<ResponseResolverOptions<CancelRelocationTaskResponse>>,
) => getSuccessMockFn(createRelocationTaskAttachmentMockFn(id), options)()
