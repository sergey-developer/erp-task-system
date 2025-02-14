import { CreateInventorizationEquipmentResponse } from 'features/warehouse/models'
import { RequestWithInventorization } from 'features/warehouse/types'
import { makeCreateInventorizationEquipmentUrl } from 'features/warehouse/utils/inventorization'

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
