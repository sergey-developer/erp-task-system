import { getRequestMockFn, getSuccessMockFn } from '_tests_/mocks/request'
import { TaskEndpointsEnum } from 'modules/task/constants/api'
import { GetTaskListResponseModel } from 'modules/task/features/TaskList/models'
import { HttpMethodEnum } from 'shared/constants/http'

const getGetTaskListMockFn = () =>
  getRequestMockFn(HttpMethodEnum.Get, TaskEndpointsEnum.TaskList)

export const mockGetTaskListSuccess = (response?: GetTaskListResponseModel) => {
  const mockGetTaskList = getSuccessMockFn(getGetTaskListMockFn(), {
    body: response,
  })

  mockGetTaskList()
}
