import { GetSubTaskListSuccessResponse } from 'modules/subTask/models'
import { getSubTaskListUrl } from 'modules/subTask/utils/apiUrls'

import { HttpMethodEnum } from 'shared/constants/http'
import { ErrorData } from 'shared/services/api'

import {
  getRequestMockFn,
  getServerErrorMockFn,
  getSuccessMockFn,
} from '_tests_/mocks/request'
import { ResponseResolverOptions } from '_tests_/mocks/response'

const getSubTaskListMockFn = (taskId: number) =>
  getRequestMockFn(HttpMethodEnum.Get, getSubTaskListUrl(taskId))

export const mockGetSubTaskListSuccess = (
  taskId: number,
  options?: Partial<ResponseResolverOptions<GetSubTaskListSuccessResponse>>,
) => {
  getSuccessMockFn(getSubTaskListMockFn(taskId), options)()
}

export const mockGetSubTaskListServerError = <T extends object>(
  taskId: number,
  options?: Partial<ResponseResolverOptions<ErrorData<T>>>,
) => {
  getServerErrorMockFn(getSubTaskListMockFn(taskId), options)()
}
