import {
  ResolveTaskBadRequestErrorResponse,
  ResolveTaskSuccessResponse,
} from 'modules/task/models'
import { resolveTaskUrl } from 'modules/task/utils'

import { HttpMethodEnum } from 'shared/constants/http'

import {
  getBadRequestErrorMockFn,
  getRequestMockFn,
  getServerErrorMockFn,
  getSuccessMockFn,
} from '_tests_/mocks/request'
import { ResponseResolverOptions } from '_tests_/mocks/response'

const resolveTaskMockFn = (taskId: number) =>
  getRequestMockFn(HttpMethodEnum.Post, resolveTaskUrl(taskId))

export const mockResolveTaskSuccess = (
  taskId: number,
  options?: Partial<ResponseResolverOptions<ResolveTaskSuccessResponse>>,
) => getSuccessMockFn(resolveTaskMockFn(taskId), options)()

export const mockResolveTaskBadRequestError = (
  taskId: number,
  options?: Partial<
    ResponseResolverOptions<ResolveTaskBadRequestErrorResponse['data']>
  >,
) => getBadRequestErrorMockFn(resolveTaskMockFn(taskId), options)()

export const mockResolveTaskServerError = (
  taskId: number,
  options?: Partial<ResponseResolverOptions>,
) => getServerErrorMockFn(resolveTaskMockFn(taskId), options)()
