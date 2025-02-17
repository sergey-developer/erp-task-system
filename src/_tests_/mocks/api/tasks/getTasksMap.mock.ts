import { TasksApiPathsEnum } from 'features/tasks/api/constants'
import { GetTasksMapResponse } from 'features/tasks/api/schemas'

import { HttpMethodEnum } from 'shared/constants/http'

import { getRequestMockFn, getSuccessMockFn } from '_tests_/mocks/api/request'
import { ResponseResolverOptions } from '_tests_/mocks/api/response'

const getTasksMapMockFn = () => getRequestMockFn(HttpMethodEnum.Get, TasksApiPathsEnum.GetTasksMap)

export const mockGetTasksMapSuccess = (
  options?: Partial<ResponseResolverOptions<GetTasksMapResponse>>,
) => getSuccessMockFn(getTasksMapMockFn(), options)()
