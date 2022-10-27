import { getRequestMockFn, getSuccessMockFn } from '_tests_/mocks/request'
import { ResponseResolverOptions } from '_tests_/mocks/response'
import { TaskEndpointsEnum } from 'modules/task/constants/api'
import { GetTaskListResponseModel } from 'modules/task/features/TaskList/models'
import { HttpMethodEnum } from 'shared/constants/http'

const getGetTaskListMockFn = () =>
  getRequestMockFn(HttpMethodEnum.Get, TaskEndpointsEnum.TaskList)

export const mockGetTaskListSuccess = (
  options?: Partial<ResponseResolverOptions<GetTaskListResponseModel>>,
) => {
  const mockGetTaskList = getSuccessMockFn(getGetTaskListMockFn(), options)
  mockGetTaskList()
}
