import { LocationTypeEnum } from 'shared/constants/catalogs'
import { MaybeUndefined } from 'shared/types/utils'

import { WarehouseTypeEnum } from '../warehouse'
import { RelocationTaskTypeEnum } from './enums'

export const relocateFromLocationTypes: Partial<
  Record<RelocationTaskTypeEnum, LocationTypeEnum[]>
> = {
  [RelocationTaskTypeEnum.Relocation]: [LocationTypeEnum.Warehouse, LocationTypeEnum.Shop],
  [RelocationTaskTypeEnum.WriteOff]: [LocationTypeEnum.Warehouse, LocationTypeEnum.Shop],
}

export const relocateFromWarehouseTypes: Partial<
  Record<RelocationTaskTypeEnum, WarehouseTypeEnum[]>
> = {
  [RelocationTaskTypeEnum.Relocation]: [
    WarehouseTypeEnum.Main,
    WarehouseTypeEnum.Msi,
    WarehouseTypeEnum.Repair,
  ],
  [RelocationTaskTypeEnum.WriteOff]: [
    WarehouseTypeEnum.Main,
    WarehouseTypeEnum.Msi,
    WarehouseTypeEnum.Repair,
  ],
}

export const relocateToLocationTypes: Partial<
  Record<RelocationTaskTypeEnum, MaybeUndefined<LocationTypeEnum[]>>
> = {
  [RelocationTaskTypeEnum.Relocation]: [LocationTypeEnum.Warehouse, LocationTypeEnum.Shop],
  [RelocationTaskTypeEnum.WriteOff]: undefined,
}

export const relocateToWarehouseTypes: Partial<
  Record<RelocationTaskTypeEnum, MaybeUndefined<WarehouseTypeEnum[]>>
> = {
  [RelocationTaskTypeEnum.Relocation]: [WarehouseTypeEnum.Main, WarehouseTypeEnum.Msi],
  [RelocationTaskTypeEnum.WriteOff]: undefined,
}
