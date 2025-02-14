import { UserRequestArgs } from 'features/users/api/types'

import { UserStatusCatalogItemDTO } from 'shared/catalogs/userStatuses/api/dto'

export type UpdateUserStatusRequest = UserRequestArgs & {
  status: number
}

export type UpdateUserStatusResponse = UserStatusCatalogItemDTO
