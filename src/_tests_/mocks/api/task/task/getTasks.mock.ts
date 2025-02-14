import { TaskApiEnum } from 'features/task/constants/task'
import { GetTasksResponse } from 'features/task/models'

import { HttpMethodEnum } from 'shared/constants/http'

import { getRequestMockFn, getSuccessMockFn } from '_tests_/mocks/request'
import { ResponseResolverOptions } from '_tests_/mocks/response'

const getTasksMockFn = () => getRequestMockFn(HttpMethodEnum.Get, TaskApiEnum.GetTasks)

export const mockGetTasksSuccess = (
  options?: Partial<ResponseResolverOptions<GetTasksResponse>>,
) => getSuccessMockFn(getTasksMockFn(), options)()

// todo: написать тесты на ошибочное получение списка
