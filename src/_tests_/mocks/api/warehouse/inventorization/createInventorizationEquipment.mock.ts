import { makeCreateInventorizationEquipmentUrl } from 'features/inventorizations/api/helpers'
import { CreateInventorizationEquipmentResponse } from 'features/warehouses/api/dto'
import { RequestWithInventorization } from 'features/warehouses/types'

import { HttpMethodEnum } from 'shared/constants/http'

import { getRequestMockFn, getSuccessMockFn } from '_tests_/mocks/request'
import { ResponseResolverOptions } from '_tests_/mocks/response'

const createInventorizationEquipmentMockFn = ({
  inventorizationId,
}: Pick<RequestWithInventorization, 'inventorizationId'>) =>
  getRequestMockFn(
    HttpMethodEnum.Post,
    makeCreateInventorizationEquipmentUrl({ inventorizationId }),
  )

export const mockCreateInventorizationEquipmentSuccess = (
  { inventorizationId }: Pick<RequestWithInventorization, 'inventorizationId'>,
  options?: Partial<ResponseResolverOptions<CreateInventorizationEquipmentResponse>>,
) => getSuccessMockFn(createInventorizationEquipmentMockFn({ inventorizationId }), options)()
