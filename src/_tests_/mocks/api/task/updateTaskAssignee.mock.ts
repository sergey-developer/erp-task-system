import {
  getRequestMockFn,
  getServerErrorMockFn,
  getSuccessMockFn,
} from '_tests_/mocks/request'
import { ResponseResolverOptions } from '_tests_/mocks/response'
import {
  UpdateTaskAssigneeMutationArgs,
  UpdateTaskAssigneeSuccessResponse,
} from 'modules/task/models'
import { updateTaskAssigneeUrl } from 'modules/task/utils/apiUrls'
import { HttpMethodEnum } from 'shared/constants/http'
import { ErrorData } from 'shared/services/api'

const updateTaskAssigneeMockFn = (
  taskId: UpdateTaskAssigneeMutationArgs['taskId'],
) => getRequestMockFn(HttpMethodEnum.Post, updateTaskAssigneeUrl(taskId))

export const mockUpdateTaskAssigneeSuccess = (
  taskId: UpdateTaskAssigneeMutationArgs['taskId'],
  options?: Partial<ResponseResolverOptions<UpdateTaskAssigneeSuccessResponse>>,
) => getSuccessMockFn(updateTaskAssigneeMockFn(taskId), options)()

export const mockUpdateTaskAssigneeServerError = <T extends object>(
  taskId: UpdateTaskAssigneeMutationArgs['taskId'],
  options?: Partial<ResponseResolverOptions<ErrorData<T>>>,
) => getServerErrorMockFn(updateTaskAssigneeMockFn(taskId), options)()
