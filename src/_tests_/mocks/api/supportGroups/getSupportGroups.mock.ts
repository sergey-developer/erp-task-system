import { HttpMethodEnum } from 'shared/constants/http'
import { SupportGroupsApiPathsEnum } from 'shared/supportGroups/api/constants'
import { GetSupportGroupsResponse } from 'shared/supportGroups/api/schemas'

import { getRequestMockFn, getServerErrorMockFn, getSuccessMockFn } from '_tests_/mocks/request'
import { ResponseResolverOptions } from '_tests_/mocks/response'

const getSupportGroupsMockFn = () =>
  getRequestMockFn(HttpMethodEnum.Get, SupportGroupsApiPathsEnum.GetSupportGroups)

export const mockGetSupportGroupsSuccess = (
  options?: Partial<ResponseResolverOptions<GetSupportGroupsResponse>>,
) => getSuccessMockFn(getSupportGroupsMockFn(), options)()

export const mockGetSupportGroupsServerError = (options?: Partial<ResponseResolverOptions>) =>
  getServerErrorMockFn(getSupportGroupsMockFn(), options)()
