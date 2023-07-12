import { AuthenticatedUser } from 'modules/auth/interfaces'
import { UserRoleEnum } from 'modules/user/constants/roles'

import { setupStore } from 'state/store'

import { fakeId } from '_tests_/utils'

import getAuthState from './getAuthState'

const getStoreWithAuth = (user?: Partial<AuthenticatedUser>) =>
  setupStore({
    preloadedState: {
      auth: getAuthState({
        user: {
          userId: user?.userId || fakeId(),
          userRole: user?.userRole || UserRoleEnum.FirstLineSupport,
        },
      }),
    },
  })

export default getStoreWithAuth
