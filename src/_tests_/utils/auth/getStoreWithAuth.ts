import { generateId } from '_tests_/utils'
import { AuthenticatedUser } from 'modules/auth/interfaces'
import { UserRoleEnum } from 'shared/constants/roles'
import { setupStore } from 'state/store'

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
