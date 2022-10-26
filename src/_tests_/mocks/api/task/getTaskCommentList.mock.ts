import { getRequestMockFn, getSuccessMockFn } from '_tests_/mocks/request'
import { GetTaskCommentListResponseModel } from 'modules/task/features/TaskView/models'
import { getTaskCommentUrl } from 'modules/task/utils/apiUrls'
import { HttpMethodEnum } from 'shared/constants/http'

const getGetTaskCommentListMockFn = (taskId: number) =>
  getRequestMockFn(HttpMethodEnum.Get, getTaskCommentUrl(taskId))

export const mockGetTaskCommentListSuccess = (
  taskId: number,
  response?: GetTaskCommentListResponseModel,
) => {
  const mockGetTaskCommentList = getSuccessMockFn(
    getGetTaskCommentListMockFn(taskId),
    {
      body: response,
    },
  )

  mockGetTaskCommentList()
}
