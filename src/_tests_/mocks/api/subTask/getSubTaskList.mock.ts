import { GetSubTaskListSuccessResponse } from 'modules/subTask/models'
import { getSubTaskListUrl } from 'modules/subTask/utils'

import { HttpMethodEnum } from 'shared/constants/http'

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

export const mockGetSubTaskListServerError = (
  taskId: number,
  options?: Partial<ResponseResolverOptions>,
) => {
  getServerErrorMockFn(getSubTaskListMockFn(taskId), options)()
}
