import {
  getRequestMockFn,
  getServerErrorMockFn,
  getSuccessMockFn,
} from '_tests_/mocks/request'
import { ResponseResolverOptions } from '_tests_/mocks/response'
import {
  UpdateTaskAssigneeMutationArgsModel,
  UpdateTaskAssigneeResponseModel,
} from 'modules/task/models'
import { getTaskAssigneeUrl } from 'modules/task/utils/apiUrls'
import { HttpMethodEnum } from 'shared/constants/http'
import { ErrorData } from 'shared/services/api'

const updateTaskAssigneeMockFn = (
  taskId: UpdateTaskAssigneeMutationArgsModel['taskId'],
) => getRequestMockFn(HttpMethodEnum.Post, getTaskAssigneeUrl(taskId))

export const mockUpdateTaskAssigneeSuccess = (
  taskId: UpdateTaskAssigneeMutationArgsModel['taskId'],
  options?: Partial<ResponseResolverOptions<UpdateTaskAssigneeResponseModel>>,
) => getSuccessMockFn(updateTaskAssigneeMockFn(taskId), options)()

export const mockUpdateTaskAssigneeServerError = <T extends object>(
  taskId: UpdateTaskAssigneeMutationArgsModel['taskId'],
  options?: Partial<ResponseResolverOptions<ErrorData<T>>>,
) => getServerErrorMockFn(updateTaskAssigneeMockFn(taskId), options)()
