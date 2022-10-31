import { getRequestMockFn, getSuccessMockFn } from '_tests_/mocks/request'
import { TaskEndpointsEnum } from 'modules/task/constants/api'
import { GetTaskCountersResponseModel } from 'modules/task/features/TaskList/models'
import { HttpMethodEnum } from 'shared/constants/http'

import { ResponseResolverOptions } from '../../response'

const getGetTaskCountersMockFn = () =>
  getRequestMockFn(HttpMethodEnum.Get, TaskEndpointsEnum.TaskCounters)

export const mockGetTaskCountersSuccess = (
  options?: Partial<ResponseResolverOptions<GetTaskCountersResponseModel>>,
) => {
  const mockGetTaskCounters = getSuccessMockFn(
    getGetTaskCountersMockFn(),
    options,
  )

  mockGetTaskCounters()
}
