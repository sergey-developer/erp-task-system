import { getRequestMockFn, getSuccessMockFn } from '_tests_/mocks/request'
import { ResponseResolverOptions } from '_tests_/mocks/response'
import { GetTaskCommentListSuccessResponse } from 'modules/task/models'
import { getTaskCommentUrl } from 'modules/task/utils/apiUrls'
import { HttpMethodEnum } from 'shared/constants/http'

const getGetTaskCommentListMockFn = (taskId: number) =>
  getRequestMockFn(HttpMethodEnum.Get, getTaskCommentUrl(taskId))

export const mockGetTaskCommentListSuccess = (
  taskId: number,
  options?: Partial<ResponseResolverOptions<GetTaskCommentListSuccessResponse>>,
) => getSuccessMockFn(getGetTaskCommentListMockFn(taskId), options)()
