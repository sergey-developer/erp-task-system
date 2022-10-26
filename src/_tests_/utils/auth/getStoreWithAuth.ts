import { generateId } from '_tests_/utils'
import { AuthenticatedUser } from 'modules/auth/interfaces'
import { UserRolesEnum } from 'shared/constants/roles'
import { setupStore } from 'state/store'

import getAuthState from './getAuthState'

const getStoreWithAuth = (user?: Partial<AuthenticatedUser>) =>
  setupStore({
    preloadedState: {
      auth: getAuthState({
        user: {
          userId: user?.userId || generateId(),
          userRole: user?.userRole || UserRolesEnum.FirstLineSupport,
        },
      }),
    },
  })

export default getStoreWithAuth
