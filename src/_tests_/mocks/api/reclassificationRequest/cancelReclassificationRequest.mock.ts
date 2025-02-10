import { HttpMethodEnum } from 'shared/constants/http'
import { makeCancelReclassificationRequestEndpoint } from 'shared/reclassificationRequests/api/helpers'
import { CancelReclassificationRequestSuccessResponse } from 'shared/reclassificationRequests/api/schemas'
import { IdType } from 'shared/types/common'

import { getRequestMockFn, getSuccessMockFn } from '_tests_/mocks/request'
import { ResponseResolverOptions } from '_tests_/mocks/response'

const cancelReclassificationRequestMockFn = (reclassificationRequestId: IdType) =>
  getRequestMockFn(
    HttpMethodEnum.Post,
    makeCancelReclassificationRequestEndpoint(reclassificationRequestId),
  )

export const mockCancelReclassificationRequestSuccess = (
  reclassificationRequestId: IdType,
  options?: Partial<ResponseResolverOptions<CancelReclassificationRequestSuccessResponse>>,
) => getSuccessMockFn(cancelReclassificationRequestMockFn(reclassificationRequestId), options)()
