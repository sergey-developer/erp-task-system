import {
  getBadRequestErrorMocker,
  getRequestMocker,
  getSuccessMocker,
} from '_tests_/mocks/request'
import {
  CreateTaskCommentResponseModel,
  GetTaskCommentListResponseModel,
} from 'modules/task/features/TaskView/models'
import { getTaskCommentUrl } from 'modules/task/utils/apiUrls'
import { HttpMethodEnum } from 'shared/constants/http'
import { REQUIRED_FIELD_MSG } from 'shared/constants/validation'

import { CreateCommentFormErrors } from '../CreateCommentForm/interfaces'
import { baseProps } from './constants'

const taskCommentUrl = getTaskCommentUrl(baseProps.taskId)

const getTaskCommentListMocker = getRequestMocker(
  HttpMethodEnum.Get,
  taskCommentUrl,
)

const createTaskCommentMocker = getRequestMocker(
  HttpMethodEnum.Post,
  taskCommentUrl,
)

export const mockGetTaskCommentListSuccess = (
  response: GetTaskCommentListResponseModel,
) => {
  const mockGetTaskCommentList = getSuccessMocker(getTaskCommentListMocker, {
    body: response,
  })

  mockGetTaskCommentList()
}

export const mockCreateTaskCommentSuccess = (
  response: CreateTaskCommentResponseModel,
) => {
  const mockCreateTaskComment = getSuccessMocker(createTaskCommentMocker, {
    body: response,
  })

  mockCreateTaskComment()
}

export const mockCreateTaskCommentBadRequestError =
  getBadRequestErrorMocker<CreateCommentFormErrors>(createTaskCommentMocker, {
    body: { comment: [REQUIRED_FIELD_MSG] },
  })
