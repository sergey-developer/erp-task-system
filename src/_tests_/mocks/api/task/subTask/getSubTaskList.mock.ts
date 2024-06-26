import { GetSubTaskListSuccessResponse } from 'modules/task/models'
import { getSubTaskListUrl } from 'modules/task/utils/task'

import { HttpMethodEnum } from 'shared/constants/http'
import { IdType } from 'shared/types/common'

import { getRequestMockFn, getServerErrorMockFn, getSuccessMockFn } from '_tests_/mocks/request'
import { ResponseResolverOptions } from '_tests_/mocks/response'

const getSubTaskListMockFn = (taskId: IdType) =>
  getRequestMockFn(HttpMethodEnum.Get, getSubTaskListUrl(taskId))

export const mockGetSubTaskListSuccess = (
  taskId: IdType,
  options?: Partial<ResponseResolverOptions<GetSubTaskListSuccessResponse>>,
) => getSuccessMockFn(getSubTaskListMockFn(taskId), options)()

export const mockGetSubTaskListServerError = (
  taskId: IdType,
  options?: Partial<ResponseResolverOptions>,
) => getServerErrorMockFn(getSubTaskListMockFn(taskId), options)()
