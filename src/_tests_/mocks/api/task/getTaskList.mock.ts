import { getRequestMockFn, getSuccessMockFn } from '_tests_/mocks/request'
import { ResponseResolverOptions } from '_tests_/mocks/response'
import { TaskEndpointEnum } from 'modules/task/constants/api'
import { GetTaskListResponseModel } from 'modules/task/models'
import { HttpMethodEnum } from 'shared/constants/http'

const getGetTaskListMockFn = () =>
  getRequestMockFn(HttpMethodEnum.Get, TaskEndpointEnum.TaskList)

export const mockGetTaskListSuccess = (
  options?: Partial<ResponseResolverOptions<GetTaskListResponseModel>>,
) => {
  const mockGetTaskList = getSuccessMockFn(getGetTaskListMockFn(), options)
  mockGetTaskList()
}
