import { getRequestMockFn, getSuccessMockFn } from '_tests_/mocks/request'
import { ResponseResolverOptions } from '_tests_/mocks/response'
import { WorkGroupEndpointsEnum } from 'modules/workGroup/constants/api'
import { GetWorkGroupListResponseModel } from 'modules/workGroup/features/WorkGroupList/models'
import { HttpMethodEnum } from 'shared/constants/http'

const getWorkGroupListMockFn = getRequestMockFn(
  HttpMethodEnum.Get,
  WorkGroupEndpointsEnum.WorkGroupList,
)

export const mockGetWorkGroupListSuccess = (
  options?: Partial<ResponseResolverOptions<GetWorkGroupListResponseModel>>,
) => {
  const mockGetWorkGroupList = getSuccessMockFn(getWorkGroupListMockFn, options)
  mockGetWorkGroupList()
}
