import { SkipToken } from '@reduxjs/toolkit/query'

import { GetUserStatusListQueryArgs } from 'modules/user/models'
import { userApiEndpoints } from 'modules/user/services/userApi.service'

export const useUserStatusListState = (
  args?: GetUserStatusListQueryArgs | SkipToken,
) => {
  return userApiEndpoints.getUserStatusList.useQueryState(args)
}
