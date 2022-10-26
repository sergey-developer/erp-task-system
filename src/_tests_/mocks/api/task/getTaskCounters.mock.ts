import { getRequestMockFn, getSuccessMockFn } from '_tests_/mocks/request'
import { TaskEndpointsEnum } from 'modules/task/constants/api'
import { GetTaskCountersResponseModel } from 'modules/task/features/TaskList/models'
import { HttpMethodEnum } from 'shared/constants/http'

const getGetTaskCountersMockFn = () =>
  getRequestMockFn(HttpMethodEnum.Get, TaskEndpointsEnum.TaskCounters)

export const mockGetTaskCountersSuccess = (
  response?: GetTaskCountersResponseModel,
) => {
  const mockGetTaskCounters = getSuccessMockFn(getGetTaskCountersMockFn(), {
    body: response,
  })

  mockGetTaskCounters()
}
