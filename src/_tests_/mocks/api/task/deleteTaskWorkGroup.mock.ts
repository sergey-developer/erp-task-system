import {
  getBadRequestErrorMockFn,
  getForbiddenErrorMockFn,
  getNotFoundErrorMockFn,
  getRequestMockFn,
  getServerErrorMockFn,
  getSuccessMockFn,
} from '_tests_/mocks/request'
import { DeleteTaskWorkGroupMutationArgsModel } from 'modules/task/features/TaskView/models'
import { getTaskWorkGroupUrl } from 'modules/task/utils/apiUrls'
import { HttpMethodEnum } from 'shared/constants/http'
import { ErrorData } from 'shared/services/api'

import { ResponseResolverOptions } from '../../response'

const deleteTaskWorkGroupMockFn = (
  taskId: DeleteTaskWorkGroupMutationArgsModel['taskId'],
) => getRequestMockFn(HttpMethodEnum.Delete, getTaskWorkGroupUrl(taskId))

export const mockDeleteTaskWorkGroupSuccess = (
  taskId: DeleteTaskWorkGroupMutationArgsModel['taskId'],
  options?: Partial<ResponseResolverOptions>,
) => {
  const mockDeleteTaskWorkGroup = getSuccessMockFn(
    deleteTaskWorkGroupMockFn(taskId),
    options,
  )

  mockDeleteTaskWorkGroup()
}

export const mockDeleteTaskWorkGroupBadRequestError = <T extends object>(
  taskId: DeleteTaskWorkGroupMutationArgsModel['taskId'],
  options?: Partial<ResponseResolverOptions<ErrorData<T>>>,
) => {
  const mockDeleteTaskWorkGroup = getBadRequestErrorMockFn(
    deleteTaskWorkGroupMockFn(taskId),
    options,
  )

  mockDeleteTaskWorkGroup()
}

export const mockDeleteTaskWorkGroupNotFoundError = <T extends object>(
  taskId: DeleteTaskWorkGroupMutationArgsModel['taskId'],
  options?: Partial<ResponseResolverOptions<ErrorData<T>>>,
) => {
  const mockDeleteTaskWorkGroup = getNotFoundErrorMockFn(
    deleteTaskWorkGroupMockFn(taskId),
    options,
  )

  mockDeleteTaskWorkGroup()
}

export const mockDeleteTaskWorkGroupServerError = <T extends object>(
  taskId: DeleteTaskWorkGroupMutationArgsModel['taskId'],
  options?: Partial<ResponseResolverOptions<ErrorData<T>>>,
) => {
  const mockDeleteTaskWorkGroup = getServerErrorMockFn(
    deleteTaskWorkGroupMockFn(taskId),
    options,
  )

  mockDeleteTaskWorkGroup()
}

export const mockDeleteTaskWorkGroupForbiddenError = <T extends object>(
  taskId: DeleteTaskWorkGroupMutationArgsModel['taskId'],
  options?: Partial<ResponseResolverOptions<ErrorData<T>>>,
) => {
  const mockDeleteTaskWorkGroup = getForbiddenErrorMockFn(
    deleteTaskWorkGroupMockFn(taskId),
    options,
  )

  mockDeleteTaskWorkGroup()
}
