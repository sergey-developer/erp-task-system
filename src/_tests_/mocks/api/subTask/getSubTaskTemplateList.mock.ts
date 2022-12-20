import {
  getRequestMockFn,
  getServerErrorMockFn,
  getSuccessMockFn,
} from '_tests_/mocks/request'
import { ResponseResolverOptions } from '_tests_/mocks/response'
import { GetSubTaskTemplateListResponseModel } from 'modules/subTask/models'
import { getSubTaskTemplateListUrl } from 'modules/subTask/utils/apiUrls'
import { HttpMethodEnum } from 'shared/constants/http'
import { ErrorData } from 'shared/services/api'

const getGetSubTaskTemplateListMockFn = () =>
  getRequestMockFn(HttpMethodEnum.Get, getSubTaskTemplateListUrl())

export const mockGetSubTaskTemplateListSuccess = (
  options?: Partial<
    ResponseResolverOptions<GetSubTaskTemplateListResponseModel>
  >,
) => getSuccessMockFn(getGetSubTaskTemplateListMockFn(), options)()

export const mockGetSubTaskTemplateListServerError = <T extends object>(
  options?: Partial<ResponseResolverOptions<ErrorData<T>>>,
) => getServerErrorMockFn(getGetSubTaskTemplateListMockFn(), options)()
