import { UserRequestArgs } from 'features/users/api/types'

import { UserStatusCatalogItemDTO } from 'shared/catalogs/userStatuses/api/dto'

export type UpdateUserStatusMutationArgs = UserRequestArgs & {
  status: number
}

export type UpdateUserStatusSuccessResponse = UserStatusCatalogItemDTO
