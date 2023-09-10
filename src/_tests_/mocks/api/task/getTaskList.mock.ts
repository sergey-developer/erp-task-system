import { TaskApiEnum } from 'modules/task/constants'
import { GetTaskListSuccessResponse } from 'modules/task/models'

import { HttpMethodEnum } from 'shared/constants/http'

import { getRequestMockFn, getSuccessMockFn, ResponseResolverOptions } from '_tests_/mocks/api'

const getTaskListMockFn = () =>
  getRequestMockFn(HttpMethodEnum.Get, TaskApiEnum.GetTaskList)

export const mockGetTaskListSuccess = (
  options?: Partial<ResponseResolverOptions<GetTaskListSuccessResponse>>,
) => getSuccessMockFn(getTaskListMockFn(), options)()

// todo: написать тесты на ошибочное получение списка
