import { GetTaskCommentListSuccessResponse } from 'features/task/models'
import { getTaskCommentListUrl } from 'features/task/utils/taskComment'

import { HttpMethodEnum } from 'shared/constants/http'
import { IdType } from 'shared/types/common'

import { getRequestMockFn, getSuccessMockFn } from '_tests_/mocks/request'
import { ResponseResolverOptions } from '_tests_/mocks/response'

const getTaskCommentListMockFn = (id: IdType) =>
  getRequestMockFn(HttpMethodEnum.Get, getTaskCommentListUrl(id))

export const mockGetTaskCommentListSuccess = (
  id: IdType,
  options?: Partial<ResponseResolverOptions<GetTaskCommentListSuccessResponse>>,
) => getSuccessMockFn(getTaskCommentListMockFn(id), options)()
