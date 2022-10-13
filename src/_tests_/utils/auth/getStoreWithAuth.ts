import { AuthenticatedUser } from 'modules/auth/interfaces'
import { setupStore } from 'state/store'

import getAuthState from './getAuthState'

const getStoreWithAuth = ({ userId, userRole }: AuthenticatedUser) =>
  setupStore({
    preloadedState: {
      auth: getAuthState({
        user: {
          userId,
          userRole,
        },
      }),
    },
  })

export default getStoreWithAuth
