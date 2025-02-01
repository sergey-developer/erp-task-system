import { UserStatusDTO } from 'shared/catalogs/api/dto/userStatuses'
import { UserStatusCodeEnum } from 'shared/catalogs/constants'

export const checkUserStatusOffline = (status: UserStatusDTO): boolean =>
  status.code === UserStatusCodeEnum.Offline
