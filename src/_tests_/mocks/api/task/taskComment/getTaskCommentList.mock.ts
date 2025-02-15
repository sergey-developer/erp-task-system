import { GetTaskCommentsResponse } from 'features/tasks/api/schemas'
import { getTaskCommentListUrl } from 'features/tasks/utils/taskComment'

import { HttpMethodEnum } from 'shared/constants/http'
import { IdType } from 'shared/types/common'

import { getRequestMockFn, getSuccessMockFn } from '_tests_/mocks/request'
import { ResponseResolverOptions } from '_tests_/mocks/response'

const getTaskCommentListMockFn = (id: IdType) =>
  getRequestMockFn(HttpMethodEnum.Get, getTaskCommentListUrl(id))

export const mockGetTaskCommentListSuccess = (
  id: IdType,
  options?: Partial<ResponseResolverOptions<GetTaskCommentsResponse>>,
) => getSuccessMockFn(getTaskCommentListMockFn(id), options)()
