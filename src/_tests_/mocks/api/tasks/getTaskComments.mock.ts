import { makeGetTaskCommentListApiPath } from 'features/tasks/api/helpers'
import { GetTaskCommentsResponse } from 'features/tasks/api/schemas'

import { HttpMethodEnum } from 'shared/constants/http'
import { IdType } from 'shared/types/common'

import { getRequestMockFn, getSuccessMockFn } from '_tests_/mocks/api/request'
import { ResponseResolverOptions } from '_tests_/mocks/api/response'

const getTaskCommentsMockFn = (id: IdType) =>
  getRequestMockFn(HttpMethodEnum.Get, makeGetTaskCommentListApiPath(id))

export const mockGetTaskCommentsSuccess = (
  id: IdType,
  options?: Partial<ResponseResolverOptions<GetTaskCommentsResponse>>,
) => getSuccessMockFn(getTaskCommentsMockFn(id), options)()
