import { SkipToken } from '@reduxjs/toolkit/query'

import { GetUserProfileQueryArgsModel } from 'modules/user/models'
import { userApiEndpoints } from 'modules/user/services/userApi.service'

export const useUserProfileState = (
  args?: GetUserProfileQueryArgsModel | SkipToken,
) => {
  return userApiEndpoints.getUserProfile.useQueryState(args)
}
