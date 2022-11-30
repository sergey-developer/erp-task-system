import {
  getBadRequestErrorMockFn,
  getRequestMockFn,
  getServerErrorMockFn,
  getSuccessMockFn,
} from '_tests_/mocks/request'
import { ResponseResolverOptions } from '_tests_/mocks/response'
import { CreateSubTaskResponseModel } from 'modules/task/features/TaskView/models'
import { getCreateSubTaskUrl } from 'modules/task/utils/apiUrls'
import { HttpMethodEnum } from 'shared/constants/http'
import { ErrorData } from 'shared/services/api'

const getCreateSubTaskMockFn = (taskId: number) =>
  getRequestMockFn(HttpMethodEnum.Post, getCreateSubTaskUrl(taskId))

export const mockCreateSubTaskSuccess = (
  taskId: number,
  options?: Partial<ResponseResolverOptions<CreateSubTaskResponseModel>>,
) => {
  getSuccessMockFn(getCreateSubTaskMockFn(taskId), options)()
}

export const mockCreateSubTaskBadRequestError = <T extends object>(
  taskId: number,
  options?: Partial<ResponseResolverOptions<ErrorData<T>>>,
) => {
  getBadRequestErrorMockFn(getCreateSubTaskMockFn(taskId), options)()
}

export const mockCreateSubTaskServerError = <T extends object>(
  taskId: number,
  options?: Partial<ResponseResolverOptions<ErrorData<T>>>,
) => {
  getServerErrorMockFn(getCreateSubTaskMockFn(taskId), options)()
}
