import { RelocationTasksApiPathsEnum } from 'features/relocationTasks/api/constants'
import { CreateRelocationTaskResponse } from 'features/relocationTasks/api/schemas'

import { HttpMethodEnum } from 'shared/constants/http'

import { getRequestMockFn, getSuccessMockFn } from '_tests_/mocks/request'
import { ResponseResolverOptions } from '_tests_/mocks/response'

const createRelocationTaskMockFn = () =>
  getRequestMockFn(HttpMethodEnum.Post, RelocationTasksApiPathsEnum.CreateRelocationTask)

export const mockCreateRelocationTaskSuccess = (
  options?: Partial<ResponseResolverOptions<CreateRelocationTaskResponse>>,
) => getSuccessMockFn(createRelocationTaskMockFn(), options)()
