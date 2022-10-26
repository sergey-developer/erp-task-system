import {
  getBadRequestErrorMockFn,
  getForbiddenErrorMockFn,
  getNotFoundErrorMockFn,
  getRequestMockFn,
  getServerErrorMockFn,
  getSuccessMockFn,
} from '_tests_/mocks/request'
import { TaskFirstLineFormErrors } from 'modules/task/features/TaskView/components/TaskFirstLineModal/interfaces'
import { DeleteTaskWorkGroupMutationArgsModel } from 'modules/task/features/TaskView/models'
import { getTaskWorkGroupUrl } from 'modules/task/utils/apiUrls'
import { HttpMethodEnum } from 'shared/constants/http'
import { ErrorData } from 'shared/services/api'

const deleteTaskWorkGroupMockFn = (
  taskId: DeleteTaskWorkGroupMutationArgsModel['taskId'],
) => getRequestMockFn(HttpMethodEnum.Delete, getTaskWorkGroupUrl(taskId))

export const mockDeleteTaskWorkGroupSuccess = (
  taskId: DeleteTaskWorkGroupMutationArgsModel['taskId'],
) => {
  const mockDeleteTaskWorkGroup = getSuccessMockFn(
    deleteTaskWorkGroupMockFn(taskId),
  )

  mockDeleteTaskWorkGroup()
}

export const mockDeleteTaskWorkGroupBadRequestError = (
  taskId: DeleteTaskWorkGroupMutationArgsModel['taskId'],
  response?: ErrorData<TaskFirstLineFormErrors>,
) => {
  const mockDeleteTaskWorkGroup = getBadRequestErrorMockFn(
    deleteTaskWorkGroupMockFn(taskId),
    { body: response },
  )

  mockDeleteTaskWorkGroup()
}

export const mockDeleteTaskWorkGroupNotFoundError = (
  taskId: DeleteTaskWorkGroupMutationArgsModel['taskId'],
  response?: ErrorData,
) => {
  const mockDeleteTaskWorkGroup = getNotFoundErrorMockFn(
    deleteTaskWorkGroupMockFn(taskId),
    { body: response },
  )

  mockDeleteTaskWorkGroup()
}

export const mockDeleteTaskWorkGroupServerError = (
  taskId: DeleteTaskWorkGroupMutationArgsModel['taskId'],
  response?: ErrorData,
) => {
  const mockDeleteTaskWorkGroup = getServerErrorMockFn(
    deleteTaskWorkGroupMockFn(taskId),
    { body: response },
  )

  mockDeleteTaskWorkGroup()
}

export const mockDeleteTaskWorkGroupForbiddenError = (
  taskId: DeleteTaskWorkGroupMutationArgsModel['taskId'],
  response?: ErrorData,
) => {
  const mockDeleteTaskWorkGroup = getForbiddenErrorMockFn(
    deleteTaskWorkGroupMockFn(taskId),
    { body: response },
  )

  mockDeleteTaskWorkGroup()
}
