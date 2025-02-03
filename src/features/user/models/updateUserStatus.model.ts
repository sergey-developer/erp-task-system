import { UserRequestArgs } from 'features/user/types'

import { UserStatusCatalogItemDTO } from 'shared/catalogs/api/dto/userStatuses'

export type UpdateUserStatusMutationArgs = UserRequestArgs & {
  status: number
}

export type UpdateUserStatusSuccessResponse = UserStatusCatalogItemDTO
