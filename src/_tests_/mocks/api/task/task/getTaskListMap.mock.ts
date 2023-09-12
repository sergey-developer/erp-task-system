import { GetTaskListMapSuccessResponse } from 'modules/task/models'
import { TaskApiEnum } from 'modules/task/services/taskApiService'

import { HttpMethodEnum } from 'shared/constants/http'

import { getRequestMockFn, getSuccessMockFn } from '_tests_/mocks/request'
import { ResponseResolverOptions } from '_tests_/mocks/response'

const getTaskListMapMockFn = () => getRequestMockFn(HttpMethodEnum.Get, TaskApiEnum.GetTaskListMap)

export const mockGetTaskListMapSuccess = (
  options?: Partial<ResponseResolverOptions<GetTaskListMapSuccessResponse>>,
) => getSuccessMockFn(getTaskListMapMockFn(), options)()
