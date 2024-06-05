import { CompleteInventorizationSuccessResponse } from 'modules/warehouse/models'
import { InventorizationRequestArgs } from 'modules/warehouse/types'
import { makeCompleteInventorizationUrl } from 'modules/warehouse/utils/inventorization'

import { HttpMethodEnum } from 'shared/constants/http'

import { getRequestMockFn, getSuccessMockFn } from '_tests_/mocks/request'
import { ResponseResolverOptions } from '_tests_/mocks/response'

const completeInventorizationMockFn = ({
  inventorizationId,
}: Pick<InventorizationRequestArgs, 'inventorizationId'>) =>
  getRequestMockFn(HttpMethodEnum.Post, makeCompleteInventorizationUrl({ inventorizationId }))

export const mockCompleteInventorizationSuccess = (
  { inventorizationId }: Pick<InventorizationRequestArgs, 'inventorizationId'>,
  options?: Partial<ResponseResolverOptions<CompleteInventorizationSuccessResponse>>,
) => getSuccessMockFn(completeInventorizationMockFn({ inventorizationId }), options)()
