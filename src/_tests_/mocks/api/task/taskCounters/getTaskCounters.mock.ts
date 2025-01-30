import { TaskApiEnum } from 'features/task/constants/task'
import { GetTaskCountersSuccessResponse } from 'features/task/models'

import { HttpMethodEnum } from 'shared/constants/http'

import { getRequestMockFn, getSuccessMockFn } from '_tests_/mocks/request'
import { ResponseResolverOptions } from '_tests_/mocks/response'

const getTaskCountersMockFn = () =>
  getRequestMockFn(HttpMethodEnum.Get, TaskApiEnum.GetTaskCounters)

export const mockGetTaskCountersSuccess = (
  options?: Partial<ResponseResolverOptions<GetTaskCountersSuccessResponse>>,
) => getSuccessMockFn(getTaskCountersMockFn(), options)()

// todo: написать тесты на ошибочное получение
