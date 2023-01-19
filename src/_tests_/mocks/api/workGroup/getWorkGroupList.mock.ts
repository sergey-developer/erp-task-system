import { getRequestMockFn, getSuccessMockFn } from '_tests_/mocks/request'
import { ResponseResolverOptions } from '_tests_/mocks/response'
import { WorkGroupEndpointsEnum } from 'modules/workGroup/constants/api'
import { GetWorkGroupListSuccessResponse } from 'modules/workGroup/models'
import { HttpMethodEnum } from 'shared/constants/http'

const getWorkGroupListMockFn = getRequestMockFn(
  HttpMethodEnum.Get,
  WorkGroupEndpointsEnum.WorkGroupList,
)

export const mockGetWorkGroupListSuccess = (
  options?: Partial<ResponseResolverOptions<GetWorkGroupListSuccessResponse>>,
) => {
  const mockGetWorkGroupList = getSuccessMockFn(getWorkGroupListMockFn, options)
  mockGetWorkGroupList()
}
