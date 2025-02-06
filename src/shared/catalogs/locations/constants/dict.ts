import { StringMap } from 'shared/types/utils'

import { LocationTypeEnum } from '../api/constants'

export const locationTypeDict: Readonly<StringMap<LocationTypeEnum>> = {
  [LocationTypeEnum.Shop]: 'Магазин',
  [LocationTypeEnum.Warehouse]: 'Склад',
  [LocationTypeEnum.ServiceCenter]: 'Сервисный центр',
}
