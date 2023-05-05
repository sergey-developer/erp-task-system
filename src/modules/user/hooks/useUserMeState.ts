import { SkipToken } from '@reduxjs/toolkit/query'

import { GetUserMeQueryArgs } from 'modules/user/models'
import { userApiEndpoints } from 'modules/user/services/userApi.service'

export const useUserMeState = (args?: GetUserMeQueryArgs | SkipToken) => {
  return userApiEndpoints.getUserMe.useQueryState(args)
}
