import { CreateInventorizationEquipmentSuccessResponse } from 'modules/warehouse/models'
import { InventorizationRequestArgs } from 'modules/warehouse/types'
import { makeCreateInventorizationEquipmentUrl } from 'modules/warehouse/utils/inventorization'

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
