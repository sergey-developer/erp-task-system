import { GetSubTaskTemplateListSuccessResponse } from 'modules/subTask/models'
import { getSubTaskTemplateListUrl } from 'modules/subTask/utils/apiUrls'

import { HttpMethodEnum } from 'shared/constants/http'
import { ErrorData } from 'shared/services/api'

import {
  getRequestMockFn,
  getServerErrorMockFn,
  getSuccessMockFn,
} from '_tests_/mocks/request'
import { ResponseResolverOptions } from '_tests_/mocks/response'

const getSubTaskTemplateListMockFn = () =>
  getRequestMockFn(HttpMethodEnum.Get, getSubTaskTemplateListUrl())

export const mockGetSubTaskTemplateListSuccess = (
  options?: Partial<
    ResponseResolverOptions<GetSubTaskTemplateListSuccessResponse>
  >,
) => getSuccessMockFn(getSubTaskTemplateListMockFn(), options)()

export const mockGetSubTaskTemplateListServerError = <T extends object>(
  options?: Partial<ResponseResolverOptions<ErrorData<T>>>,
) => getServerErrorMockFn(getSubTaskTemplateListMockFn(), options)()
