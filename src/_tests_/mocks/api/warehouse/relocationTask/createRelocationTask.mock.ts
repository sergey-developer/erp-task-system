import { RelocationTaskApiEnum } from 'features/warehouse/constants/relocationTask'
import { CreateRelocationTaskResponse } from 'features/warehouse/models'

import { HttpMethodEnum } from 'shared/constants/http'

import { getRequestMockFn, getSuccessMockFn } from '_tests_/mocks/request'
import { ResponseResolverOptions } from '_tests_/mocks/response'

const createRelocationTaskMockFn = () =>
  getRequestMockFn(HttpMethodEnum.Post, RelocationTaskApiEnum.CreateRelocationTask)

export const mockCreateRelocationTaskSuccess = (
  options?: Partial<ResponseResolverOptions<CreateRelocationTaskResponse>>,
) => getSuccessMockFn(createRelocationTaskMockFn(), options)()
