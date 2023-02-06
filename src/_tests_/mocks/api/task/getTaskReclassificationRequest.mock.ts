import {
  getRequestMockFn,
  getServerErrorMockFn,
  getSuccessMockFn,
} from '_tests_/mocks/request'
import { ResponseResolverOptions } from '_tests_/mocks/response'
import { GetTaskReclassificationRequestSuccessResponse } from 'modules/task/models'
import { getTaskReclassificationRequestUrl } from 'modules/task/utils/apiUrls'
import { HttpMethodEnum } from 'shared/constants/http'
import { ErrorData } from 'shared/services/api'

const getTaskReclassificationRequestMockFn = (taskId: number) =>
  getRequestMockFn(
    HttpMethodEnum.Get,
    getTaskReclassificationRequestUrl(taskId),
  )

export const mockGetTaskReclassificationRequestSuccess = (
  taskId: number,
  options?: Partial<
    ResponseResolverOptions<GetTaskReclassificationRequestSuccessResponse>
  >,
) => getSuccessMockFn(getTaskReclassificationRequestMockFn(taskId), options)()

export const mockGetTaskReclassificationRequestServerError = <T extends object>(
  taskId: number,
  options?: Partial<ResponseResolverOptions<ErrorData<T>>>,
) =>
  getServerErrorMockFn(getTaskReclassificationRequestMockFn(taskId), options)()
