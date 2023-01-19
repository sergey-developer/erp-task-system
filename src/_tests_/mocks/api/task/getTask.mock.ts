import {
  getBadRequestErrorMockFn,
  getForbiddenErrorMockFn,
  getNotFoundErrorMockFn,
  getRequestMockFn,
  getServerErrorMockFn,
  getSuccessMockFn,
} from '_tests_/mocks/request'
import { ResponseResolverOptions } from '_tests_/mocks/response'
import { GetTaskQueryArgs, GetTaskSuccessResponse } from 'modules/task/models'
import { getTaskUrl } from 'modules/task/utils/apiUrls'
import { HttpMethodEnum } from 'shared/constants/http'
import { ErrorData } from 'shared/services/api'

const getTaskMockFn = (taskId: GetTaskQueryArgs) =>
  getRequestMockFn(HttpMethodEnum.Get, getTaskUrl(taskId))

export const mockGetTaskSuccess = (
  taskId: GetTaskQueryArgs,
  options?: Partial<ResponseResolverOptions<GetTaskSuccessResponse>>,
) => getSuccessMockFn(getTaskMockFn(taskId), options)()

export const mockGetTaskNotFoundError = <T extends object>(
  taskId: GetTaskQueryArgs,
  options?: Partial<ResponseResolverOptions<ErrorData<T>>>,
) => getNotFoundErrorMockFn(getTaskMockFn(taskId), options)()

export const mockGetTaskBadRequestError = <T extends object>(
  taskId: GetTaskQueryArgs,
  options?: Partial<ResponseResolverOptions<ErrorData<T>>>,
) => getBadRequestErrorMockFn(getTaskMockFn(taskId), options)()

export const mockGetTaskForbiddenError = <T extends object>(
  taskId: GetTaskQueryArgs,
  options?: Partial<ResponseResolverOptions<ErrorData<T>>>,
) => getForbiddenErrorMockFn(getTaskMockFn(taskId), options)()

export const mockGetTaskServerError = <T extends object>(
  taskId: GetTaskQueryArgs,
  options?: Partial<ResponseResolverOptions<ErrorData<T>>>,
) => getServerErrorMockFn(getTaskMockFn(taskId), options)()
