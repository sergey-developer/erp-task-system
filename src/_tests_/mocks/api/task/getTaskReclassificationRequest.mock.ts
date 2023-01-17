import {
  getRequestMockFn,
  getServerErrorMockFn,
  getSuccessMockFn,
} from '_tests_/mocks/request'
import { ResponseResolverOptions } from '_tests_/mocks/response'
import {
  GetTaskReclassificationRequestQueryArgsModel,
  GetTaskReclassificationRequestResponseModel,
} from 'modules/task/models'
import { getTaskReclassificationRequestUrl } from 'modules/task/utils/apiUrls'
import { HttpMethodEnum } from 'shared/constants/http'
import { ErrorData } from 'shared/services/api'

const getTaskReclassificationRequestMockFn = (
  taskId: GetTaskReclassificationRequestQueryArgsModel,
) =>
  getRequestMockFn(
    HttpMethodEnum.Get,
    getTaskReclassificationRequestUrl(taskId),
  )

export const mockGetTaskReclassificationRequestSuccess = (
  taskId: GetTaskReclassificationRequestQueryArgsModel,
  options?: Partial<
    ResponseResolverOptions<GetTaskReclassificationRequestResponseModel>
  >,
) => getSuccessMockFn(getTaskReclassificationRequestMockFn(taskId), options)()

export const mockGetTaskReclassificationRequestServerError = <T extends object>(
  taskId: GetTaskReclassificationRequestQueryArgsModel,
  options?: Partial<ResponseResolverOptions<ErrorData<T>>>,
) =>
  getServerErrorMockFn(getTaskReclassificationRequestMockFn(taskId), options)()
