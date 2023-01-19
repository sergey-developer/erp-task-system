import {
  getBadRequestErrorMockFn,
  getRequestMockFn,
  getServerErrorMockFn,
  getSuccessMockFn,
} from '_tests_/mocks/request'
import { ResponseResolverOptions } from '_tests_/mocks/response'
import { CreateSubTaskSuccessResponse } from 'modules/subTask/models'
import { getCreateSubTaskUrl } from 'modules/subTask/utils/apiUrls'
import { HttpMethodEnum } from 'shared/constants/http'
import { ErrorData } from 'shared/services/api'

const getCreateSubTaskMockFn = (taskId: number) =>
  getRequestMockFn(HttpMethodEnum.Post, getCreateSubTaskUrl(taskId))

export const mockCreateSubTaskSuccess = (
  taskId: number,
  options?: Partial<ResponseResolverOptions<CreateSubTaskSuccessResponse>>,
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
