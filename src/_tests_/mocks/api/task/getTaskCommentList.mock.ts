import { GetTaskCommentListSuccessResponse } from 'modules/task/models'
import { getTaskCommentListUrl } from 'modules/task/utils'

import { HttpMethodEnum } from 'shared/constants/http'
import { IdType } from 'shared/types/common'

import { getRequestMockFn, getSuccessMockFn, ResponseResolverOptions } from '_tests_/mocks/api'

const getTaskCommentListMockFn = (id: IdType) =>
  getRequestMockFn(HttpMethodEnum.Get, getTaskCommentListUrl(id))

export const mockGetTaskCommentListSuccess = (
  id: IdType,
  options?: Partial<ResponseResolverOptions<GetTaskCommentListSuccessResponse>>,
) => getSuccessMockFn(getTaskCommentListMockFn(id), options)()
