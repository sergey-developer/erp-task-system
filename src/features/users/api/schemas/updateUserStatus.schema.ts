import { RequestWithUser } from 'features/users/api/types'

import { UserStatusCatalogItemDTO } from 'shared/catalogs/userStatuses/api/dto'

export type UpdateUserStatusRequest = RequestWithUser & {
  status: number
}

export type UpdateUserStatusResponse = UserStatusCatalogItemDTO
