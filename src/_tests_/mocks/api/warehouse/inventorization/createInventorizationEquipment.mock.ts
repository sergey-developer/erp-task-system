import { CreateInventorizationEquipmentSuccessResponse } from 'features/warehouse/models'
import { InventorizationRequestArgs } from 'features/warehouse/types'
import { makeCreateInventorizationEquipmentUrl } from 'features/warehouse/utils/inventorization'

import { HttpMethodEnum } from 'shared/constants/http'

import { getRequestMockFn, getSuccessMockFn } from '_tests_/mocks/request'
import { ResponseResolverOptions } from '_tests_/mocks/response'

const createInventorizationEquipmentMockFn = ({
  inventorizationId,
}: Pick<InventorizationRequestArgs, 'inventorizationId'>) =>
  getRequestMockFn(
    HttpMethodEnum.Post,
    makeCreateInventorizationEquipmentUrl({ inventorizationId }),
  )

export const mockCreateInventorizationEquipmentSuccess = (
  { inventorizationId }: Pick<InventorizationRequestArgs, 'inventorizationId'>,
  options?: Partial<ResponseResolverOptions<CreateInventorizationEquipmentSuccessResponse>>,
) => getSuccessMockFn(createInventorizationEquipmentMockFn({ inventorizationId }), options)()
