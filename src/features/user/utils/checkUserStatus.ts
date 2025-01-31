import { UserStatusModel } from 'shared/catalogs/api/dto/userStatuses'
import { UserStatusCodeEnum } from 'shared/catalogs/constants'

export const checkUserStatusOffline = (status: UserStatusModel): boolean =>
  status.code === UserStatusCodeEnum.Offline
