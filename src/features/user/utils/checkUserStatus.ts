import { UserStatusCodeEnum } from 'shared/catalogs/constants'
import { UserStatusModel } from 'shared/catalogs/models/userStatuses'

export const checkUserStatusOffline = (status: UserStatusModel): boolean =>
  status.code === UserStatusCodeEnum.Offline
