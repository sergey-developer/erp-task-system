import { UserStatusCodeEnum } from 'shared/constants/catalogs'
import { UserStatusModel } from 'shared/models/catalogs/userStatus'

export const checkUserStatusOffline = (status: UserStatusModel): boolean =>
  status.code === UserStatusCodeEnum.Offline
