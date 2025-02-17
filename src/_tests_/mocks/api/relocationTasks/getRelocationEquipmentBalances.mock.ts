import { makeGetRelocationEquipmentBalancesApiPath } from 'features/relocationTasks/api/helpers'
import { GetRelocationEquipmentBalancesResponse } from 'features/relocationTasks/api/schemas'

import { HttpMethodEnum } from 'shared/constants/http'
import { IdType } from 'shared/types/common'

import { getRequestMockFn, getSuccessMockFn } from '_tests_/mocks/api/request'
import { ResponseResolverOptions } from '_tests_/mocks/api/response'

const getRelocationEquipmentBalancesMockFn = (id: IdType) =>
  getRequestMockFn(HttpMethodEnum.Get, makeGetRelocationEquipmentBalancesApiPath(id))

export const mockGetRelocationEquipmentBalancesSuccess = (
  id: IdType,
  options?: Partial<ResponseResolverOptions<GetRelocationEquipmentBalancesResponse>>,
) => getSuccessMockFn(getRelocationEquipmentBalancesMockFn(id), options)()
