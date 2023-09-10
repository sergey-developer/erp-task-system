import { SubTaskApiEnum } from 'modules/subTask/constants'
import { GetSubTaskTemplateListSuccessResponse } from 'modules/subTask/models'

import { HttpMethodEnum } from 'shared/constants/http'

import {
  getRequestMockFn,
  getServerErrorMockFn,
  getSuccessMockFn,
  ResponseResolverOptions
} from '_tests_/mocks/api'

const getSubTaskTemplateListMockFn = () =>
  getRequestMockFn(HttpMethodEnum.Get, SubTaskApiEnum.GetSubTaskTemplateList)

export const mockGetSubTaskTemplateListSuccess = (
  options?: Partial<
    ResponseResolverOptions<GetSubTaskTemplateListSuccessResponse>
  >,
) => getSuccessMockFn(getSubTaskTemplateListMockFn(), options)()

export const mockGetSubTaskTemplateListServerError = (
  options?: Partial<ResponseResolverOptions>,
) => getServerErrorMockFn(getSubTaskTemplateListMockFn(), options)()
