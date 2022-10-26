import { getRequestMockFn, getSuccessMockFn } from '_tests_/mocks/request'
import { WorkGroupEndpointsEnum } from 'modules/workGroup/constants/api'
import { HttpMethodEnum } from 'shared/constants/http'

import { WorkGroupListItemModel } from '../models'

const getWorkGroupListMockFn = getRequestMockFn(
  HttpMethodEnum.Get,
  WorkGroupEndpointsEnum.WorkGroupList,
)

export const mockGetWorkGroupListSuccess = (
  response?: WorkGroupListItemModel[],
) => {
  const mockGetWorkGroupList = getSuccessMockFn(getWorkGroupListMockFn, {
    body: response,
  })

  mockGetWorkGroupList()
}
