import { UsersEndpointsEnum } from 'features/users/api/constants'

import { IdType } from 'shared/types/common'
import { generateApiPath } from 'shared/utils/api'

export const makeUpdateUserEndpoint = (userId: IdType): string =>
  generateApiPath(UsersEndpointsEnum.UpdateUser, { id: String(userId) })

export const makeUpdateUserStatusEndpoint = (userId: IdType): string =>
  generateApiPath(UsersEndpointsEnum.UpdateUserStatus, { id: String(userId) })

export const makeGetWarehouseMSIEndpoint = (userId: IdType): string =>
  generateApiPath(UsersEndpointsEnum.GetWarehouseMSI, { id: String(userId) })

export const makeGetUserActionsEndpoint = (userId: IdType): string =>
  generateApiPath(UsersEndpointsEnum.GetUserActions, { id: String(userId) })
