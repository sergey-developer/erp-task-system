import { TaskApiEnum } from 'modules/task/constants'
import { GetTaskCountersSuccessResponse } from 'modules/task/models'

import { HttpMethodEnum } from 'shared/constants/http'

import { getRequestMockFn, getSuccessMockFn, ResponseResolverOptions } from '_tests_/mocks/api'

const getTaskCountersMockFn = () =>
  getRequestMockFn(HttpMethodEnum.Get, TaskApiEnum.GetTaskCounters)

export const mockGetTaskCountersSuccess = (
  options?: Partial<ResponseResolverOptions<GetTaskCountersSuccessResponse>>,
) => getSuccessMockFn(getTaskCountersMockFn(), options)()

// todo: написать тесты на ошибочное получение
