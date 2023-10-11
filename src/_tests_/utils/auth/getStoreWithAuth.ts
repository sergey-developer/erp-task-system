import { AuthenticatedUser } from 'modules/auth/types'
import { UserRoleEnum } from 'modules/user/constants'

import { setupStore } from 'state/store'

import { fakeId } from '_tests_/utils'

import getAuthState from './getAuthState'

// todo: fix type api: any
const getStoreWithAuth = (user?: Partial<AuthenticatedUser>, api?: any) =>
  setupStore({
    preloadedState: {
      auth: getAuthState({
        user: {
          userId: user?.userId || fakeId(),
          userRole: user?.userRole || UserRoleEnum.FirstLineSupport,
        },
      }),
      api,
    },
  })

export default getStoreWithAuth
