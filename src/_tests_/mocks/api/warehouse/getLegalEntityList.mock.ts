import { LegalEntityApiEnum } from 'modules/warehouse/constants'
import { GetLegalEntityListSuccessResponse } from 'modules/warehouse/models'

import { HttpMethodEnum } from 'shared/constants/http'

import { getRequestMockFn, getServerErrorMockFn, getSuccessMockFn } from '_tests_/mocks/request'
import { ResponseResolverOptions } from '_tests_/mocks/response'

const getLegalEntityListMockFn = () =>
  getRequestMockFn(HttpMethodEnum.Get, LegalEntityApiEnum.GetLegalEntityList)

export const mockGetLegalEntityListSuccess = (
  options?: Partial<ResponseResolverOptions<GetLegalEntityListSuccessResponse>>,
) => getSuccessMockFn(getLegalEntityListMockFn(), options)()

export const mockGetLegalEntityListServerError = (options?: Partial<ResponseResolverOptions>) =>
  getServerErrorMockFn(getLegalEntityListMockFn(), options)()
