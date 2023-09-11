import { TaskApiEnum } from 'modules/task/constants'
import { GetFiscalAccumulatorTaskListSuccessResponse } from 'modules/task/models'

import { HttpMethodEnum } from 'shared/constants/http'

import { getRequestMockFn, getServerErrorMockFn, getSuccessMockFn } from '_tests_/mocks/request'
import { ResponseResolverOptions } from '_tests_/mocks/response'

const getFiscalAccumulatorTaskListMockFn = () =>
  getRequestMockFn(HttpMethodEnum.Get, TaskApiEnum.GetFiscalAccumulatorTaskList)

export const mockGetFiscalAccumulatorTaskListSuccess = (
  options?: Partial<ResponseResolverOptions<GetFiscalAccumulatorTaskListSuccessResponse>>,
) => getSuccessMockFn(getFiscalAccumulatorTaskListMockFn(), options)()

export const mockGetFiscalAccumulatorTaskListServerError = (
  options?: Partial<ResponseResolverOptions>,
) => getServerErrorMockFn(getFiscalAccumulatorTaskListMockFn(), options)()
