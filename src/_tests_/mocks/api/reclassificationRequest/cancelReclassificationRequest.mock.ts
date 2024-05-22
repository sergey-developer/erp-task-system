import { CancelReclassificationRequestSuccessResponse } from 'modules/reclassificationRequest/models'
import { cancelReclassificationRequestUrl } from 'modules/reclassificationRequest/utils/apiUrls'

import { HttpMethodEnum } from 'shared/constants/http'
import { IdType } from 'shared/types/common'

import { getRequestMockFn, getSuccessMockFn } from '_tests_/mocks/request'
import { ResponseResolverOptions } from '_tests_/mocks/response'

const cancelReclassificationRequestMockFn = (reclassificationRequestId: IdType) =>
  getRequestMockFn(HttpMethodEnum.Post, cancelReclassificationRequestUrl(reclassificationRequestId))

export const mockCancelReclassificationRequestSuccess = (
  reclassificationRequestId: IdType,
  options?: Partial<ResponseResolverOptions<CancelReclassificationRequestSuccessResponse>>,
) => getSuccessMockFn(cancelReclassificationRequestMockFn(reclassificationRequestId), options)()
