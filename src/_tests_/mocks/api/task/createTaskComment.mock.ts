import {
  getBadRequestErrorMockFn,
  getForbiddenErrorMockFn,
  getNotFoundErrorMockFn,
  getRequestMockFn,
  getServerErrorMockFn,
  getSuccessMockFn,
} from '_tests_/mocks/request'
import { ResponseResolverOptions } from '_tests_/mocks/response'
import { CreateTaskCommentResponseModel } from 'modules/task/features/TaskView/models'
import { getTaskCommentUrl } from 'modules/task/utils/apiUrls'
import { HttpMethodEnum } from 'shared/constants/http'
import { ErrorData } from 'shared/services/api'

const getCreateTaskCommentMockFn = (taskId: number) =>
  getRequestMockFn(HttpMethodEnum.Post, getTaskCommentUrl(taskId))

export const mockCreateTaskCommentSuccess = (
  taskId: number,
  options?: Partial<ResponseResolverOptions<CreateTaskCommentResponseModel>>,
) => {
  const mockCreateTaskComment = getSuccessMockFn(
    getCreateTaskCommentMockFn(taskId),
    options,
  )

  mockCreateTaskComment()
}

export const mockCreateTaskCommentBadRequestError = <T extends object>(
  taskId: number,
  options?: Partial<ResponseResolverOptions<ErrorData<T>>>,
) => {
  const mockCreateTaskComment = getBadRequestErrorMockFn(
    getCreateTaskCommentMockFn(taskId),
    options,
  )

  mockCreateTaskComment()
}

export const mockCreateTaskCommentNotFoundError = <T extends object>(
  taskId: number,
  options?: Partial<ResponseResolverOptions<ErrorData<T>>>,
) => {
  const mockCreateTaskComment = getNotFoundErrorMockFn(
    getCreateTaskCommentMockFn(taskId),
    options,
  )

  mockCreateTaskComment()
}

export const mockCreateTaskCommentForbiddenError = <T extends object>(
  taskId: number,
  options?: Partial<ResponseResolverOptions<ErrorData<T>>>,
) => {
  const mockCreateTaskComment = getForbiddenErrorMockFn(
    getCreateTaskCommentMockFn(taskId),
    options,
  )

  mockCreateTaskComment()
}

export const mockCreateTaskCommentServerError = <T extends object>(
  taskId: number,
  options?: Partial<ResponseResolverOptions<ErrorData<T>>>,
) => {
  const mockCreateTaskComment = getServerErrorMockFn(
    getCreateTaskCommentMockFn(taskId),
    options,
  )

  mockCreateTaskComment()
}
