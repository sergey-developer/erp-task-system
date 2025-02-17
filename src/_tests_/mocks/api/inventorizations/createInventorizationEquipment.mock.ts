import { makeCreateInventorizationEquipmentApiPath } from 'features/inventorizations/api/helpers'
import { CreateInventorizationEquipmentResponse } from 'features/inventorizations/api/schemas'
import { RequestWithInventorization } from 'features/inventorizations/api/types'

import { HttpMethodEnum } from 'shared/constants/http'

import { getRequestMockFn, getSuccessMockFn } from '_tests_/mocks/api/request'
import { ResponseResolverOptions } from '_tests_/mocks/api/response'

const createInventorizationEquipmentMockFn = ({
  inventorizationId,
}: Pick<RequestWithInventorization, 'inventorizationId'>) =>
  getRequestMockFn(
    HttpMethodEnum.Post,
    makeCreateInventorizationEquipmentApiPath({ inventorizationId }),
  )

export const mockCreateInventorizationEquipmentSuccess = (
  { inventorizationId }: Pick<RequestWithInventorization, 'inventorizationId'>,
  options?: Partial<ResponseResolverOptions<CreateInventorizationEquipmentResponse>>,
) => getSuccessMockFn(createInventorizationEquipmentMockFn({ inventorizationId }), options)()
