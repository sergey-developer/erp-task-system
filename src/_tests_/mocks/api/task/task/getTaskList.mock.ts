import { TaskApiEnum } from 'modules/task/services/taskApiService'
import { GetTaskListSuccessResponse } from 'modules/task/models'

import { HttpMethodEnum } from 'shared/constants/http'

import { getRequestMockFn, getSuccessMockFn } from '_tests_/mocks/request'
import { ResponseResolverOptions } from '_tests_/mocks/response'

const getTaskListMockFn = () => getRequestMockFn(HttpMethodEnum.Get, TaskApiEnum.GetTaskList)

export const mockGetTaskListSuccess = (
  options?: Partial<ResponseResolverOptions<GetTaskListSuccessResponse>>,
) => getSuccessMockFn(getTaskListMockFn(), options)()

// todo: написать тесты на ошибочное получение списка
