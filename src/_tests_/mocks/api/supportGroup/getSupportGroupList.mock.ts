import { SupportGroupApiEnum } from 'modules/supportGroup/constants'
import { GetSupportGroupListSuccessResponse } from 'modules/supportGroup/models'

import { HttpMethodEnum } from 'shared/constants/http'

import {
  getRequestMockFn,
  getServerErrorMockFn,
  getSuccessMockFn,
  ResponseResolverOptions
} from '_tests_/mocks/api'

const getSupportGroupListMockFn = () =>
  getRequestMockFn(
    HttpMethodEnum.Get,
    SupportGroupApiEnum.GetSupportGroupList,
  )

export const mockGetSupportGroupListSuccess = (
  options?: Partial<
    ResponseResolverOptions<GetSupportGroupListSuccessResponse>
  >,
) => getSuccessMockFn(getSupportGroupListMockFn(), options)()

export const mockGetSupportGroupListServerError = (
  options?: Partial<ResponseResolverOptions>,
) => getServerErrorMockFn(getSupportGroupListMockFn(), options)()
