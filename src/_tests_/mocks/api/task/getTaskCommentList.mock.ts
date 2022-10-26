import {
  getBadRequestErrorMockFn,
  getForbiddenErrorMockFn,
  getNotFoundErrorMockFn,
  getRequestMockFn,
  getSuccessMockFn,
} from '_tests_/mocks/request'
import {
  CreateTaskCommentResponseModel,
  GetTaskCommentListResponseModel,
} from 'modules/task/features/TaskView/models'
import { getTaskCommentUrl } from 'modules/task/utils/apiUrls'
import { HttpMethodEnum } from 'shared/constants/http'
import { ErrorData } from 'shared/services/api'

const getGetTaskCommentListMockFn = (taskId: number) =>
  getRequestMockFn(HttpMethodEnum.Get, getTaskCommentUrl(taskId))

const getCreateTaskCommentMockFn = (taskId: number) =>
  getRequestMockFn(HttpMethodEnum.Post, getTaskCommentUrl(taskId))

export const mockGetTaskCommentListSuccess = (
  taskId: number,
  response?: GetTaskCommentListResponseModel,
) => {
  const mockGetTaskCommentList = getSuccessMockFn(
    getGetTaskCommentListMockFn(taskId),
    { body: response },
  )

  mockGetTaskCommentList()
}

export const mockCreateTaskCommentSuccess = (
  taskId: number,
  response?: CreateTaskCommentResponseModel,
) => {
  const mockCreateTaskComment = getSuccessMockFn(
    getCreateTaskCommentMockFn(taskId),
    { body: response },
  )

  mockCreateTaskComment()
}

export const mockCreateTaskCommentBadRequestError = <T extends object>(
  taskId: number,
  response?: ErrorData<T>,
) => {
  const mockCreateTaskComment = getBadRequestErrorMockFn(
    getCreateTaskCommentMockFn(taskId),
    { body: response },
  )

  mockCreateTaskComment()
}

export const mockCreateTaskCommentNotFoundError = <T extends object>(
  taskId: number,
  response?: ErrorData<T>,
) => {
  const mockCreateTaskComment = getNotFoundErrorMockFn(
    getCreateTaskCommentMockFn(taskId),
    { body: response },
  )

  mockCreateTaskComment()
}

export const mockCreateTaskCommentForbiddenError = <T extends object>(
  taskId: number,
  response?: ErrorData<T>,
) => {
  const mockCreateTaskComment = getForbiddenErrorMockFn(
    getCreateTaskCommentMockFn(taskId),
    { body: response },
  )

  mockCreateTaskComment()
}
