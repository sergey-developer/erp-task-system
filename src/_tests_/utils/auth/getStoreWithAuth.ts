import { AuthenticatedUser } from 'modules/auth/interfaces'

import { setupStore } from 'state/store'

import { UserRoleEnum } from 'modules/user/constants/roles'

import { generateId } from '_tests_/utils'

import getAuthState from './getAuthState'

const getStoreWithAuth = (user?: Partial<AuthenticatedUser>) =>
  setupStore({
    preloadedState: {
      auth: getAuthState({
        user: {
          userId: user?.userId || generateId(),
          userRole: user?.userRole || UserRoleEnum.FirstLineSupport,
        },
      }),
    },
  })

export default getStoreWithAuth
