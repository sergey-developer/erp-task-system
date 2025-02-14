import { GetTaskListMapResponse } from 'features/task/models'
import { TaskApiEnum } from 'features/task/constants/task'

import { HttpMethodEnum } from 'shared/constants/http'

import { getRequestMockFn, getSuccessMockFn } from '_tests_/mocks/request'
import { ResponseResolverOptions } from '_tests_/mocks/response'

const getTaskListMapMockFn = () => getRequestMockFn(HttpMethodEnum.Get, TaskApiEnum.GetTaskListMap)

export const mockGetTaskListMapSuccess = (
  options?: Partial<ResponseResolverOptions<GetTaskListMapResponse>>,
) => getSuccessMockFn(getTaskListMapMockFn(), options)()
