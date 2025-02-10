import { HttpMethodEnum } from 'shared/constants/http'
import { SupportGroupsEndpointsEnum } from 'shared/supportGroups/api/constants'
import { GetSupportGroupsSuccessResponse } from 'shared/supportGroups/api/dto'

import { getRequestMockFn, getServerErrorMockFn, getSuccessMockFn } from '_tests_/mocks/request'
import { ResponseResolverOptions } from '_tests_/mocks/response'

const getSupportGroupListMockFn = () =>
  getRequestMockFn(HttpMethodEnum.Get, SupportGroupsEndpointsEnum.GetSupportGroups)

export const mockGetSupportGroupListSuccess = (
  options?: Partial<ResponseResolverOptions<GetSupportGroupsSuccessResponse>>,
) => getSuccessMockFn(getSupportGroupListMockFn(), options)()

export const mockGetSupportGroupListServerError = (options?: Partial<ResponseResolverOptions>) =>
  getServerErrorMockFn(getSupportGroupListMockFn(), options)()
