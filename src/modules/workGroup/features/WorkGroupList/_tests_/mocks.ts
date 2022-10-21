import { getRequestMocker, getSuccessMocker } from '_tests_/mocks/request'
import { WorkGroupEndpointsEnum } from 'modules/workGroup/constants/api'
import { HttpMethodEnum } from 'shared/constants/http'

import { WorkGroupListItemModel } from '../models'

const getWorkGroupListMocker = getRequestMocker(
  HttpMethodEnum.Get,
  WorkGroupEndpointsEnum.WorkGroupList,
)

export const mockGetWorkGroupListSuccess = (
  response: WorkGroupListItemModel[],
) => {
  const mockGetWorkGroupList = getSuccessMocker(getWorkGroupListMocker, {
    body: response,
  })

  mockGetWorkGroupList()
}
