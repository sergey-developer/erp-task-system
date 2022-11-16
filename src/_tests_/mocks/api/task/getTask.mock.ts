import { getRequestMockFn, getSuccessMockFn } from '_tests_/mocks/request'
import { ResponseResolverOptions } from '_tests_/mocks/response'
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
  options?: Partial<ResponseResolverOptions<GetTaskResponseModel>>,
) => {
  const mockGetTask = getSuccessMockFn(getTaskMockFn(taskId), options)
  mockGetTask()
}
