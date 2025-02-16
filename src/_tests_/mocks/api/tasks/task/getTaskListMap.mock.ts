import { TasksApiPathsEnum } from 'features/tasks/api/constants'
import { GetTasksMapResponse } from 'features/tasks/api/schemas'

import { HttpMethodEnum } from 'shared/constants/http'

import { getRequestMockFn, getSuccessMockFn } from '_tests_/mocks/request'
import { ResponseResolverOptions } from '_tests_/mocks/response'

const getTaskListMapMockFn = () =>
  getRequestMockFn(HttpMethodEnum.Get, TasksApiPathsEnum.GetTasksMap)

export const mockGetTaskListMapSuccess = (
  options?: Partial<ResponseResolverOptions<GetTasksMapResponse>>,
) => getSuccessMockFn(getTaskListMapMockFn(), options)()
