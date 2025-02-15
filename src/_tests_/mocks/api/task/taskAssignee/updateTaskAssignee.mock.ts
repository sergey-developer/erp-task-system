import { UpdateTaskAssigneeResponse } from 'features/tasks/api/schemas'
import { updateTaskAssigneeUrl } from 'features/tasks/utils/taskAssignee'

import { HttpMethodEnum } from 'shared/constants/http'
import { IdType } from 'shared/types/common'

import { getRequestMockFn, getServerErrorMockFn, getSuccessMockFn } from '_tests_/mocks/request'
import { ResponseResolverOptions } from '_tests_/mocks/response'

const updateTaskAssigneeMockFn = (taskId: IdType) =>
  getRequestMockFn(HttpMethodEnum.Post, updateTaskAssigneeUrl(taskId))

export const mockUpdateTaskAssigneeSuccess = (
  taskId: IdType,
  options?: Partial<ResponseResolverOptions<UpdateTaskAssigneeResponse>>,
) => getSuccessMockFn(updateTaskAssigneeMockFn(taskId), options)()

export const mockUpdateTaskAssigneeServerError = (
  taskId: IdType,
  options?: Partial<ResponseResolverOptions>,
) => getServerErrorMockFn(updateTaskAssigneeMockFn(taskId), options)()
