import { SkipToken } from '@reduxjs/toolkit/query'

import { GetUserCodeQueryArgs } from 'modules/user/models'
import { userApiEndpoints } from 'modules/user/services/userApi.service'

export const useUserCodeState = (args?: GetUserCodeQueryArgs | SkipToken) => {
  return userApiEndpoints.getUserCode.useQueryState(args)
}
