import { generateId } from '_tests_/utils/generateFake'
import { AuthenticatedUser } from 'modules/auth/interfaces'
import { UserRolesEnum } from 'shared/constants/roles'
import { setupStore } from 'state/store'

import getAuthState from './getAuthState'

const getStoreWithAuth = (authenticatedUser?: Partial<AuthenticatedUser>) =>
  setupStore({
    preloadedState: {
      auth: getAuthState({
        user: {
          userId: authenticatedUser?.userId || generateId(),
          userRole:
            authenticatedUser?.userRole || UserRolesEnum.FirstLineSupport,
        },
      }),
    },
  })

export default getStoreWithAuth
