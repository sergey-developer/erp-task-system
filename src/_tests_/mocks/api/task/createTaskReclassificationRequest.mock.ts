import {
  getNotFoundErrorMockFn,
  getRequestMockFn,
  getServerErrorMockFn,
  getSuccessMockFn,
} from '_tests_/mocks/request'
import { ResponseResolverOptions } from '_tests_/mocks/response'
import {
  CreateTaskReclassificationRequestMutationArgs,
  CreateTaskReclassificationRequestSuccessResponse,
} from 'modules/task/models'
import { getCreateTaskReclassificationRequestUrl } from 'modules/task/utils/apiUrls'
import { HttpMethodEnum } from 'shared/constants/http'
import { ErrorData } from 'shared/services/api'

const createTaskReclassificationRequestMockFn = (
  taskId: CreateTaskReclassificationRequestMutationArgs['taskId'],
) =>
  getRequestMockFn(
    HttpMethodEnum.Post,
    getCreateTaskReclassificationRequestUrl(taskId),
  )

export const mockCreateTaskReclassificationRequestSuccess = (
  taskId: CreateTaskReclassificationRequestMutationArgs['taskId'],
  options?: Partial<
    ResponseResolverOptions<CreateTaskReclassificationRequestSuccessResponse>
  >,
) =>
  getSuccessMockFn(createTaskReclassificationRequestMockFn(taskId), options)()

export const mockCreateTaskReclassificationRequestNotFoundError = <
  T extends object,
>(
  taskId: CreateTaskReclassificationRequestMutationArgs['taskId'],
  options?: Partial<ResponseResolverOptions<ErrorData<T>>>,
) =>
  getNotFoundErrorMockFn(
    createTaskReclassificationRequestMockFn(taskId),
    options,
  )()

export const mockCreateTaskReclassificationRequestServerError = <
  T extends object,
>(
  taskId: CreateTaskReclassificationRequestMutationArgs['taskId'],
  options?: Partial<ResponseResolverOptions<ErrorData<T>>>,
) =>
  getServerErrorMockFn(
    createTaskReclassificationRequestMockFn(taskId),
    options,
  )()
