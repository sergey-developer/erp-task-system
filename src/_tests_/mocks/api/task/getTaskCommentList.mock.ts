import { GetTaskCommentListSuccessResponse } from 'modules/task/models'
import { getTaskCommentListUrl } from 'modules/task/utils'

import { HttpMethodEnum } from 'shared/constants/http'

import { getRequestMockFn, getSuccessMockFn } from '_tests_/mocks/request'
import { ResponseResolverOptions } from '_tests_/mocks/response'

const getTaskCommentListMockFn = (taskId: number) =>
  getRequestMockFn(HttpMethodEnum.Get, getTaskCommentListUrl(taskId))

export const mockGetTaskCommentListSuccess = (
  taskId: number,
  options?: Partial<ResponseResolverOptions<GetTaskCommentListSuccessResponse>>,
) => getSuccessMockFn(getTaskCommentListMockFn(taskId), options)()
