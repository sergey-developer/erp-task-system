import { StringMap } from 'shared/types/utils'

import { LocationTypeEnum } from './enums'

export const locationDict: Readonly<StringMap<LocationTypeEnum>> = {
  [LocationTypeEnum.Shop]: 'Магазин',
  [LocationTypeEnum.Warehouse]: 'Склад',
}
