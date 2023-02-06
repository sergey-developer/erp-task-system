import { getRequestMockFn, getSuccessMockFn } from '_tests_/mocks/request'
import { ResponseResolverOptions } from '_tests_/mocks/response'
import { TaskEndpointEnum } from 'modules/task/constants/api'
import { GetTaskListSuccessResponse } from 'modules/task/models'
import { HttpMethodEnum } from 'shared/constants/http'

const getTaskListMockFn = () =>
  getRequestMockFn(HttpMethodEnum.Get, TaskEndpointEnum.GetTaskList)

export const mockGetTaskListSuccess = (
  options?: Partial<ResponseResolverOptions<GetTaskListSuccessResponse>>,
) => getSuccessMockFn(getTaskListMockFn(), options)()

// todo: написать тесты на ошибочное получение списка
