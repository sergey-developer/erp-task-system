import { GetSubTaskListSuccessResponse } from 'modules/subTask/models'
import { getSubTaskListUrl } from 'modules/subTask/utils'

import { HttpMethodEnum } from 'shared/constants/http'
import { IdType } from 'shared/types/common'

import { getRequestMockFn, getServerErrorMockFn, getSuccessMockFn } from '_tests_/mocks/request'
import { ResponseResolverOptions } from '_tests_/mocks/response'

const getSubTaskListMockFn = (id: IdType) =>
  getRequestMockFn(HttpMethodEnum.Get, getSubTaskListUrl(id))

export const mockGetSubTaskListSuccess = (
  id: IdType,
  options?: Partial<ResponseResolverOptions<GetSubTaskListSuccessResponse>>,
) => getSuccessMockFn(getSubTaskListMockFn(id), options)()

export const mockGetSubTaskListServerError = (
  id: IdType,
  options?: Partial<ResponseResolverOptions>,
) => getServerErrorMockFn(getSubTaskListMockFn(id), options)()
