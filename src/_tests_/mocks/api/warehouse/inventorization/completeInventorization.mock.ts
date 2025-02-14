import { CompleteInventorizationResponse } from 'features/warehouse/models'
import { RequestWithInventorization } from 'features/warehouse/types'
import { makeCompleteInventorizationUrl } from 'features/warehouse/utils/inventorization'

import { HttpMethodEnum } from 'shared/constants/http'

import { getRequestMockFn, getSuccessMockFn } from '_tests_/mocks/request'
import { ResponseResolverOptions } from '_tests_/mocks/response'

const completeInventorizationMockFn = ({
  inventorizationId,
}: Pick<RequestWithInventorization, 'inventorizationId'>) =>
  getRequestMockFn(HttpMethodEnum.Post, makeCompleteInventorizationUrl({ inventorizationId }))

export const mockCompleteInventorizationSuccess = (
  { inventorizationId }: Pick<RequestWithInventorization, 'inventorizationId'>,
  options?: Partial<ResponseResolverOptions<CompleteInventorizationResponse>>,
) => getSuccessMockFn(completeInventorizationMockFn({ inventorizationId }), options)()
