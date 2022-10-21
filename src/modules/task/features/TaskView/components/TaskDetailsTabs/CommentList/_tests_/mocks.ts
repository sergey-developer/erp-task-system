import { getRequestMocker } from '_tests_/mocks/request'
import { getResponseResolver } from '_tests_/mocks/response'
import {
  CreateTaskCommentResponseModel,
  GetTaskCommentListResponseModel,
} from 'modules/task/features/TaskView/models'
import { getTaskCommentUrl } from 'modules/task/utils/apiUrls'
import { HttpCodeEnum, HttpMethodEnum } from 'shared/constants/http'

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
  const mockGetTaskCommentList = getTaskCommentListMocker(
    getResponseResolver({
      status: HttpCodeEnum.Ok,
      body: response,
    }),
  )

  mockGetTaskCommentList()
}

export const mockCreateTaskCommentSuccess = (
  response: CreateTaskCommentResponseModel,
) => {
  const mockCreateTaskComment = createTaskCommentMocker(
    getResponseResolver({
      status: HttpCodeEnum.Ok,
      body: response,
    }),
  )

  mockCreateTaskComment()
}
