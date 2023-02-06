import { SkipToken } from '@reduxjs/toolkit/query'

import { GetUserProfileQueryArgs } from 'modules/user/models'
import { userApiEndpoints } from 'modules/user/services/userApi.service'

export const useUserProfileState = (
  args?: GetUserProfileQueryArgs | SkipToken,
) => {
  return userApiEndpoints.getUserProfile.useQueryState(args)
}
