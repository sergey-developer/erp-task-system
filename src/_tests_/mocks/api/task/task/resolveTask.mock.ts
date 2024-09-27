import { ResolveTaskSuccessResponse } from 'modules/task/models'
import { resolveTaskUrl } from 'modules/task/utils/task'

import { HttpMethodEnum } from 'shared/constants/http'
import { IdType } from 'shared/types/common'

import { getRequestMockFn, getSuccessMockFn } from '_tests_/mocks/request'
import { ResponseResolverOptions } from '_tests_/mocks/response'

const resolveTaskMockFn = (taskId: IdType) =>
  getRequestMockFn(HttpMethodEnum.Post, resolveTaskUrl(taskId))

export const mockResolveTaskSuccess = (
  taskId: IdType,
  options?: Partial<ResponseResolverOptions<ResolveTaskSuccessResponse>>,
) => getSuccessMockFn(resolveTaskMockFn(taskId), options)()
