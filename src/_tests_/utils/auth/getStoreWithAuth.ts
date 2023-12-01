import { AuthenticatedUser } from 'modules/auth/types'
import { UserRoleEnum } from 'modules/user/constants'

import { setupStore } from 'state/store'

import { fakeId } from '_tests_/utils'

import { getAuthState } from './getAuthState'

// todo: fix type api: any
export const getStoreWithAuth = (
  user?: Partial<AuthenticatedUser>,
  accessToken?: string,
  refreshToken?: string,
  api?: Partial<{ queries: Record<string, any> }>,
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
      api: api as any,
    },
  })
