import {
  getRequestMockFn,
  getServerErrorMockFn,
  getSuccessMockFn,
} from '_tests_/mocks/request'
import { ResponseResolverOptions } from '_tests_/mocks/response'
import {
  TakeTaskMutationArgsModel,
  TakeTaskResponseModel,
} from 'modules/task/models'
import { getTakeTaskUrl } from 'modules/task/utils/apiUrls'
import { HttpMethodEnum } from 'shared/constants/http'
import { ErrorData } from 'shared/services/api'

const takeTaskMockFn = (taskId: TakeTaskMutationArgsModel['taskId']) =>
  getRequestMockFn(HttpMethodEnum.Post, getTakeTaskUrl(taskId))

export const mockTakeTaskSuccess = (
  taskId: TakeTaskMutationArgsModel['taskId'],
  options?: Partial<ResponseResolverOptions<TakeTaskResponseModel>>,
) => getSuccessMockFn(takeTaskMockFn(taskId), options)()

export const mockTakeTaskServerError = <T extends object>(
  taskId: TakeTaskMutationArgsModel['taskId'],
  options?: Partial<ResponseResolverOptions<ErrorData<T>>>,
) => getServerErrorMockFn(takeTaskMockFn(taskId), options)()
