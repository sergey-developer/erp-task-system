import { SupportGroupEndpointsEnum } from 'modules/supportGroup/constants'
import { GetSupportGroupListSuccessResponse } from 'modules/supportGroup/models'

import { HttpMethodEnum } from 'shared/constants/http'

import {
  getRequestMockFn,
  getServerErrorMockFn,
  getSuccessMockFn,
} from '_tests_/mocks/request'
import { ResponseResolverOptions } from '_tests_/mocks/response'

const getSupportGroupListMockFn = () =>
  getRequestMockFn(
    HttpMethodEnum.Get,
    SupportGroupEndpointsEnum.GetSupportGroupList,
  )

export const mockGetSupportGroupListSuccess = (
  options?: Partial<
    ResponseResolverOptions<GetSupportGroupListSuccessResponse>
  >,
) => getSuccessMockFn(getSupportGroupListMockFn(), options)()

export const mockGetSupportGroupListServerError = (
  options?: Partial<ResponseResolverOptions>,
) => getServerErrorMockFn(getSupportGroupListMockFn(), options)()
