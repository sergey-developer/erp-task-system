import { TaskApiEnum } from 'modules/task/constants'
import { GetFiscalAccumulatorTaskListSuccessResponse } from 'modules/task/models'

import { HttpMethodEnum } from 'shared/constants/http'

import {
  getRequestMockFn,
  getServerErrorMockFn,
  getSuccessMockFn,
  ResponseResolverOptions
} from '_tests_/mocks/api'

const getFiscalAccumulatorTaskListMockFn = () =>
  getRequestMockFn(HttpMethodEnum.Get, TaskApiEnum.GetFiscalAccumulatorTaskList)

export const mockGetFiscalAccumulatorTaskListSuccess = (
  options?: Partial<
    ResponseResolverOptions<GetFiscalAccumulatorTaskListSuccessResponse>
  >,
) => getSuccessMockFn(getFiscalAccumulatorTaskListMockFn(), options)()

export const mockGetFiscalAccumulatorTaskListServerError = (
  options?: Partial<ResponseResolverOptions>,
) => getServerErrorMockFn(getFiscalAccumulatorTaskListMockFn(), options)()
