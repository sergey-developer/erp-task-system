import { AuthenticatedUser } from 'modules/auth/types'
import { UserRoleEnum } from 'modules/user/constants'

import { setupStore } from 'state/store'

import { fakeId } from '_tests_/utils'

import getAuthState from './getAuthState'

const getStoreWithAuth = (
  user?: Partial<AuthenticatedUser>,
  accessToken?: string,
  refreshToken?: string,
) =>
  setupStore({
    preloadedState: {
      auth: getAuthState({
        user: {
          userId: user?.userId || fakeId(),
          userRole: user?.userRole || UserRoleEnum.FirstLineSupport,
        },
        accessToken,
        refreshToken,
      }),
    },
  })

export default getStoreWithAuth
