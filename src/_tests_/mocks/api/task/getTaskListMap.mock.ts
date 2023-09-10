import { TaskApiEnum } from 'modules/task/constants'
import { GetTaskListMapSuccessResponse } from 'modules/task/models'

import { HttpMethodEnum } from 'shared/constants/http'

import { getRequestMockFn, getSuccessMockFn, ResponseResolverOptions } from '_tests_/mocks/api'

const getTaskListMapMockFn = () =>
  getRequestMockFn(HttpMethodEnum.Get, TaskApiEnum.GetTaskListMap)

export const mockGetTaskListMapSuccess = (
  options?: Partial<ResponseResolverOptions<GetTaskListMapSuccessResponse>>,
) => getSuccessMockFn(getTaskListMapMockFn(), options)()
