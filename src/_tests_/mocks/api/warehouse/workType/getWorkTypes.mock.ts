import { WorkTypeApiEnum } from 'modules/warehouse/constants/workType'
import { GetWorkTypesSuccessResponse } from 'modules/warehouse/models'

import { HttpMethodEnum } from 'shared/constants/http'

import { getRequestMockFn, getSuccessMockFn } from '_tests_/mocks/request'
import { ResponseResolverOptions } from '_tests_/mocks/response'

const getWorkTypesMockFn = () => getRequestMockFn(HttpMethodEnum.Get, WorkTypeApiEnum.GetWorkTypes)

export const mockGetWorkTypesSuccess = (
  options?: Partial<ResponseResolverOptions<GetWorkTypesSuccessResponse>>,
) => getSuccessMockFn(getWorkTypesMockFn(), options)()
