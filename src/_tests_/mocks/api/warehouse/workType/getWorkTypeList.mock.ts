import { WorkTypeApiEnum } from 'modules/warehouse/constants/workType'
import { GetWorkTypeListSuccessResponse } from 'modules/warehouse/models'

import { HttpMethodEnum } from 'shared/constants/http'

import { getRequestMockFn, getServerErrorMockFn, getSuccessMockFn } from '_tests_/mocks/request'
import { ResponseResolverOptions } from '_tests_/mocks/response'

const getWorkTypeListMockFn = () =>
  getRequestMockFn(HttpMethodEnum.Get, WorkTypeApiEnum.GetWorkTypeList)

export const mockGetWorkTypeListSuccess = (
  options?: Partial<ResponseResolverOptions<GetWorkTypeListSuccessResponse>>,
) => getSuccessMockFn(getWorkTypeListMockFn(), options)()

export const mockGetWorkTypeListServerError = (options?: Partial<ResponseResolverOptions>) =>
  getServerErrorMockFn(getWorkTypeListMockFn(), options)()
