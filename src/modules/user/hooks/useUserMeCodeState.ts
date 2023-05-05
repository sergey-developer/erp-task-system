import { SkipToken } from '@reduxjs/toolkit/query'

import { GetUserMeCodeQueryArgs } from 'modules/user/models'
import { userApiEndpoints } from 'modules/user/services/userApi.service'

export const useUserMeCodeState = (
  args?: GetUserMeCodeQueryArgs | SkipToken,
) => {
  return userApiEndpoints.getUserMeCode.useQueryState(args)
}
