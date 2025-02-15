import { TasksApiPathsEnum } from 'features/tasks/api/constants'
import { GetTaskCountersResponse } from 'features/tasks/api/schemas'

import { HttpMethodEnum } from 'shared/constants/http'

import { getRequestMockFn, getSuccessMockFn } from '_tests_/mocks/request'
import { ResponseResolverOptions } from '_tests_/mocks/response'

const getTaskCountersMockFn = () =>
  getRequestMockFn(HttpMethodEnum.Get, TasksApiPathsEnum.GetTaskCounters)

export const mockGetTaskCountersSuccess = (
  options?: Partial<ResponseResolverOptions<GetTaskCountersResponse>>,
) => getSuccessMockFn(getTaskCountersMockFn(), options)()

// todo: написать тесты на ошибочное получение
