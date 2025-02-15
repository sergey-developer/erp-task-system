import { UserStatusCodeEnum } from 'shared/catalogs/userStatuses/api/constants'
import { UserStatusCatalogItemDTO } from 'shared/catalogs/userStatuses/api/dto'

export const checkUserStatusOffline = (status: UserStatusCatalogItemDTO): boolean =>
  status.code === UserStatusCodeEnum.Offline
