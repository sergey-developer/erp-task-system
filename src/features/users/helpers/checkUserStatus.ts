import { UserStatusCatalogItemDTO } from 'shared/catalogs/api/dto/userStatuses'
import { UserStatusCodeEnum } from 'shared/catalogs/constants'

export const checkUserStatusOffline = (status: UserStatusCatalogItemDTO): boolean =>
  status.code === UserStatusCodeEnum.Offline
