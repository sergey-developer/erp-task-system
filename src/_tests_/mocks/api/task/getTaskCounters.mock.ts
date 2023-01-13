import { getRequestMockFn, getSuccessMockFn } from '_tests_/mocks/request'
import { ResponseResolverOptions } from '_tests_/mocks/response'
import { TaskEndpointEnum } from 'modules/task/constants/api'
import { GetTaskCountersResponseModel } from 'modules/task/models'
import { HttpMethodEnum } from 'shared/constants/http'

const getGetTaskCountersMockFn = () =>
  getRequestMockFn(HttpMethodEnum.Get, TaskEndpointEnum.TaskCounters)

export const mockGetTaskCountersSuccess = (
  options?: Partial<ResponseResolverOptions<GetTaskCountersResponseModel>>,
) => getSuccessMockFn(getGetTaskCountersMockFn(), options)()

// todo: написать тесты на ошибочное получение
