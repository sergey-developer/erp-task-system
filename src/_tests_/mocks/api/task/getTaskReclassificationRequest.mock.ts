import {
  getRequestMockFn,
  getServerErrorMockFn,
  getSuccessMockFn,
} from '_tests_/mocks/request'
import { ResponseResolverOptions } from '_tests_/mocks/response'
import {
  GetTaskReclassificationRequestQueryArgs,
  GetTaskReclassificationRequestSuccessResponse,
} from 'modules/task/models'
import { getTaskReclassificationRequestUrl } from 'modules/task/utils/apiUrls'
import { HttpMethodEnum } from 'shared/constants/http'
import { ErrorData } from 'shared/services/api'

const getTaskReclassificationRequestMockFn = (
  taskId: GetTaskReclassificationRequestQueryArgs,
) =>
  getRequestMockFn(
    HttpMethodEnum.Get,
    getTaskReclassificationRequestUrl(taskId),
  )

export const mockGetTaskReclassificationRequestSuccess = (
  taskId: GetTaskReclassificationRequestQueryArgs,
  options?: Partial<
    ResponseResolverOptions<GetTaskReclassificationRequestSuccessResponse>
  >,
) => getSuccessMockFn(getTaskReclassificationRequestMockFn(taskId), options)()

export const mockGetTaskReclassificationRequestServerError = <T extends object>(
  taskId: GetTaskReclassificationRequestQueryArgs,
  options?: Partial<ResponseResolverOptions<ErrorData<T>>>,
) =>
  getServerErrorMockFn(getTaskReclassificationRequestMockFn(taskId), options)()
