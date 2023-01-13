import {
  getRequestMockFn,
  getServerErrorMockFn,
  getSuccessMockFn,
} from '_tests_/mocks/request'
import { ResponseResolverOptions } from '_tests_/mocks/response'
import {
  CreateTaskReclassificationRequestMutationArgsModel,
  CreateTaskReclassificationRequestResponseModel,
} from 'modules/task/models'
import { getCreateTaskReclassificationRequestUrl } from 'modules/task/utils/apiUrls'
import { HttpMethodEnum } from 'shared/constants/http'
import { ErrorData } from 'shared/services/api'

const createTaskReclassificationRequestMockFn = (
  taskId: CreateTaskReclassificationRequestMutationArgsModel['taskId'],
) =>
  getRequestMockFn(
    HttpMethodEnum.Post,
    getCreateTaskReclassificationRequestUrl(taskId),
  )

export const mockCreateTaskReclassificationRequestSuccess = (
  taskId: CreateTaskReclassificationRequestMutationArgsModel['taskId'],
  options?: Partial<
    ResponseResolverOptions<CreateTaskReclassificationRequestResponseModel>
  >,
) =>
  getSuccessMockFn(createTaskReclassificationRequestMockFn(taskId), options)()

export const mockCreateTaskReclassificationRequestServerError = <
  T extends object,
>(
  taskId: CreateTaskReclassificationRequestMutationArgsModel['taskId'],
  options?: Partial<ResponseResolverOptions<ErrorData<T>>>,
) =>
  getServerErrorMockFn(
    createTaskReclassificationRequestMockFn(taskId),
    options,
  )()
