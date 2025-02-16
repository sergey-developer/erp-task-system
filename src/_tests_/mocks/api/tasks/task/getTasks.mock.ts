import { TasksApiPathsEnum } from 'features/tasks/api/constants'
import { GetTasksResponse } from 'features/tasks/api/schemas'

import { HttpMethodEnum } from 'shared/constants/http'

import { getRequestMockFn, getSuccessMockFn } from '_tests_/mocks/request'
import { ResponseResolverOptions } from '_tests_/mocks/response'

const getTasksMockFn = () => getRequestMockFn(HttpMethodEnum.Get, TasksApiPathsEnum.GetTasks)

export const mockGetTasksSuccess = (
  options?: Partial<ResponseResolverOptions<GetTasksResponse>>,
) => getSuccessMockFn(getTasksMockFn(), options)()

// todo: написать тесты на ошибочное получение списка
