import { getRequestMockFn, getSuccessMockFn } from '_tests_/mocks/request'
import {
  GetTaskQueryArgsModel,
  GetTaskResponseModel,
} from 'modules/task/features/TaskView/models'
import { getTaskUrl } from 'modules/task/utils/apiUrls'
import { HttpMethodEnum } from 'shared/constants/http'

const getTaskMockFn = (taskId: GetTaskQueryArgsModel) =>
  getRequestMockFn(HttpMethodEnum.Get, getTaskUrl(taskId))

export const mockGetTaskSuccess = (
  taskId: GetTaskQueryArgsModel,
  response?: GetTaskResponseModel,
) => {
  const mockGetTask = getSuccessMockFn(getTaskMockFn(taskId), {
    body: response,
  })

  mockGetTask()
}
