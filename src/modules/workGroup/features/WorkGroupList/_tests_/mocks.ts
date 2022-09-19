import { getRequestMocker } from '_tests_/mocks/request'
import { getResponseResolver } from '_tests_/mocks/response'
import { WorkGroupEndpointsEnum } from 'modules/workGroup/constants/api'
import { HttpCodeEnum, HttpMethodEnum } from 'shared/constants/http'

import { WorkGroupListItemModel } from '../models'

const getWorkGroupListMocker = getRequestMocker(
  HttpMethodEnum.Get,
  WorkGroupEndpointsEnum.WorkGroupList,
)

export const mockGetWorkGroupListSuccess = (
  response: WorkGroupListItemModel[],
) => {
  const mockGetWorkGroupList = getWorkGroupListMocker(
    getResponseResolver({
      status: HttpCodeEnum.Ok,
      body: response,
    }),
  )

  mockGetWorkGroupList()
}
