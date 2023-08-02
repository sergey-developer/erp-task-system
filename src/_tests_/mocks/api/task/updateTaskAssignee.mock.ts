import { UpdateTaskAssigneeSuccessResponse } from 'modules/task/models'
import { updateTaskAssigneeUrl } from 'modules/task/utils'

import { HttpMethodEnum } from 'shared/constants/http'

import {
  getRequestMockFn,
  getServerErrorMockFn,
  getSuccessMockFn,
} from '_tests_/mocks/request'
import { ResponseResolverOptions } from '_tests_/mocks/response'

const updateTaskAssigneeMockFn = (taskId: number) =>
  getRequestMockFn(HttpMethodEnum.Post, updateTaskAssigneeUrl(taskId))

export const mockUpdateTaskAssigneeSuccess = (
  taskId: number,
  options?: Partial<ResponseResolverOptions<UpdateTaskAssigneeSuccessResponse>>,
) => getSuccessMockFn(updateTaskAssigneeMockFn(taskId), options)()

export const mockUpdateTaskAssigneeServerError = (
  taskId: number,
  options?: Partial<ResponseResolverOptions>,
) => getServerErrorMockFn(updateTaskAssigneeMockFn(taskId), options)()
