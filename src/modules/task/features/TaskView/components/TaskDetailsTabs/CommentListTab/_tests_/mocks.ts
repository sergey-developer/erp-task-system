import {
  getBadRequestErrorMockFn,
  getForbiddenErrorMockFn,
  getNotFoundErrorMockFn,
  getRequestMockFn,
  getServerErrorMockFn,
  getSuccessMockFn,
} from '_tests_/mocks/request'
import {
  CreateTaskCommentResponseModel,
  GetTaskCommentListResponseModel,
} from 'modules/task/features/TaskView/models'
import { getTaskCommentUrl } from 'modules/task/utils/apiUrls'
import { HttpMethodEnum } from 'shared/constants/http'
import { ErrorData } from 'shared/services/api'

import { CreateCommentFormErrors } from '../CreateCommentForm/interfaces'
import { baseProps } from './constants'

const taskCommentUrl = getTaskCommentUrl(baseProps.taskId)

const getTaskCommentListMockFn = getRequestMockFn(
  HttpMethodEnum.Get,
  taskCommentUrl,
)

const createTaskCommentMockFn = getRequestMockFn(
  HttpMethodEnum.Post,
  taskCommentUrl,
)

export const mockGetTaskCommentListSuccess = (
  response: GetTaskCommentListResponseModel,
) => {
  const mockGetTaskCommentList = getSuccessMockFn(getTaskCommentListMockFn, {
    body: response,
  })

  mockGetTaskCommentList()
}

export const mockCreateTaskCommentSuccess = (
  response: CreateTaskCommentResponseModel,
) => {
  const mockCreateTaskComment = getSuccessMockFn(createTaskCommentMockFn, {
    body: response,
  })

  mockCreateTaskComment()
}

export const mockCreateTaskCommentBadRequestError = (
  response: ErrorData<CreateCommentFormErrors>,
) => {
  const mockCreateTaskComment = getBadRequestErrorMockFn(
    createTaskCommentMockFn,
    { body: response },
  )

  mockCreateTaskComment()
}

export const mockCreateTaskCommentNotFoundError = getNotFoundErrorMockFn(
  createTaskCommentMockFn,
)

export const mockCreateTaskCommentServerError = getServerErrorMockFn(
  createTaskCommentMockFn,
)

export const mockCreateTaskCommentForbiddenError = getForbiddenErrorMockFn(
  createTaskCommentMockFn,
)
