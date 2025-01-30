import { UserModel } from 'features/user/models'

import { setupStore } from 'state/store'

import { Nullable } from 'shared/types/utils'

import { fakeId } from '_tests_/utils'

import { getAuthState } from './getAuthState'

// todo: make passing args as object
// todo: fix type api: any
export const getStoreWithAuth = (
  authUser?: Partial<Pick<UserModel, 'id'>>,
  accessToken?: Nullable<string>,
  refreshToken?: Nullable<string>,
  api?: Partial<{ queries: Record<string, any> }>,
) =>
  setupStore({
    preloadedState: {
      auth: getAuthState({
        user: { userId: authUser?.id || fakeId() },
        accessToken,
        refreshToken,
      }),
      api: api as any,
    },
  })
