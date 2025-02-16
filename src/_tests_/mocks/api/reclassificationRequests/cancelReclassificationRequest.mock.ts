import { HttpMethodEnum } from 'shared/constants/http'
import { makeCancelReclassificationRequestApiPath } from 'shared/reclassificationRequests/api/helpers'
import { CancelReclassificationRequestResponse } from 'shared/reclassificationRequests/api/schemas'
import { IdType } from 'shared/types/common'

import { getRequestMockFn, getSuccessMockFn } from '_tests_/mocks/request'
import { ResponseResolverOptions } from '_tests_/mocks/response'

const cancelReclassificationRequestMockFn = (reclassificationRequestId: IdType) =>
  getRequestMockFn(
    HttpMethodEnum.Post,
    makeCancelReclassificationRequestApiPath(reclassificationRequestId),
  )

export const mockCancelReclassificationRequestSuccess = (
  reclassificationRequestId: IdType,
  options?: Partial<ResponseResolverOptions<CancelReclassificationRequestResponse>>,
) => getSuccessMockFn(cancelReclassificationRequestMockFn(reclassificationRequestId), options)()
