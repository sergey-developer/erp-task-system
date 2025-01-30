import { TaskApiEnum } from 'features/task/constants/task'
import { GetTasksSuccessResponse } from 'features/task/models'

import { HttpMethodEnum } from 'shared/constants/http'

import { getRequestMockFn, getSuccessMockFn } from '_tests_/mocks/request'
import { ResponseResolverOptions } from '_tests_/mocks/response'

const getTasksMockFn = () => getRequestMockFn(HttpMethodEnum.Get, TaskApiEnum.GetTasks)

export const mockGetTasksSuccess = (
  options?: Partial<ResponseResolverOptions<GetTasksSuccessResponse>>,
) => getSuccessMockFn(getTasksMockFn(), options)()

// todo: написать тесты на ошибочное получение списка
