import {
  getRequestMockFn,
  getServerErrorMockFn,
  getSuccessMockFn,
} from '_tests_/mocks/request'
import { ResponseResolverOptions } from '_tests_/mocks/response'
import {
  TakeTaskMutationArgs,
  TakeTaskSuccessResponse,
} from 'modules/task/models'
import { takeTaskUrl } from 'modules/task/utils/apiUrls'
import { HttpMethodEnum } from 'shared/constants/http'
import { ErrorData } from 'shared/services/api'

const takeTaskMockFn = (taskId: TakeTaskMutationArgs['taskId']) =>
  getRequestMockFn(HttpMethodEnum.Post, takeTaskUrl(taskId))

export const mockTakeTaskSuccess = (
  taskId: TakeTaskMutationArgs['taskId'],
  options?: Partial<ResponseResolverOptions<TakeTaskSuccessResponse>>,
) => getSuccessMockFn(takeTaskMockFn(taskId), options)()

export const mockTakeTaskServerError = <T extends object>(
  taskId: TakeTaskMutationArgs['taskId'],
  options?: Partial<ResponseResolverOptions<ErrorData<T>>>,
) => getServerErrorMockFn(takeTaskMockFn(taskId), options)()
