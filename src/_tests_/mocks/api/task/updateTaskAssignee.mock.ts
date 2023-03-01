import { UpdateTaskAssigneeSuccessResponse } from 'modules/task/models'
import { updateTaskAssigneeUrl } from 'modules/task/utils/apiUrls'

import { HttpMethodEnum } from 'shared/constants/http'
import { ErrorData } from 'shared/services/api'

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

export const mockUpdateTaskAssigneeServerError = <T extends object>(
  taskId: number,
  options?: Partial<ResponseResolverOptions<ErrorData<T>>>,
) => getServerErrorMockFn(updateTaskAssigneeMockFn(taskId), options)()
