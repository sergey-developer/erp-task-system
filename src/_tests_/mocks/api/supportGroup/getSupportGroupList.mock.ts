import { SupportGroupEndpointsEnum } from 'modules/supportGroup/constants/api'
import { GetSupportGroupListSuccessResponse } from 'modules/supportGroup/models'

import { HttpMethodEnum } from 'shared/constants/http'
import { ErrorData } from 'shared/services/api'

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

export const mockGetSupportGroupListServerError = <T extends object>(
  options?: Partial<ResponseResolverOptions<ErrorData<T>>>,
) => getServerErrorMockFn(getSupportGroupListMockFn(), options)()
