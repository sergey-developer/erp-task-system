import { UserModel } from 'modules/user/models'

import { setupStore } from 'state/store'

import { Nullable } from 'shared/types/utils'

import { fakeId } from '_tests_/utils'

import { getAuthState } from './getAuthState'

// todo: fix type api: any
export const getStoreWithAuth = (
  user?: Partial<Pick<UserModel, 'id'>>,
  accessToken?: Nullable<string>,
  refreshToken?: Nullable<string>,
  api?: Partial<{ queries: Record<string, any> }>,
) =>
  setupStore({
    preloadedState: {
      auth: getAuthState({
        user: { userId: user?.id || fakeId() },
        accessToken,
        refreshToken,
      }),
      api: api as any,
    },
  })
