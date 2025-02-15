import { makeCompleteInventorizationApiPath } from 'features/inventorizations/api/helpers'
import { CompleteInventorizationResponse } from 'features/inventorizations/api/schemas'
import { RequestWithInventorization } from 'features/inventorizations/api/types'

import { HttpMethodEnum } from 'shared/constants/http'

import { getRequestMockFn, getSuccessMockFn } from '_tests_/mocks/request'
import { ResponseResolverOptions } from '_tests_/mocks/response'

const completeInventorizationMockFn = ({
  inventorizationId,
}: Pick<RequestWithInventorization, 'inventorizationId'>) =>
  getRequestMockFn(HttpMethodEnum.Post, makeCompleteInventorizationApiPath({ inventorizationId }))

export const mockCompleteInventorizationSuccess = (
  { inventorizationId }: Pick<RequestWithInventorization, 'inventorizationId'>,
  options?: Partial<ResponseResolverOptions<CompleteInventorizationResponse>>,
) => getSuccessMockFn(completeInventorizationMockFn({ inventorizationId }), options)()
