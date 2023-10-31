import { EquipmentConditionEnum } from 'modules/warehouse/constants/equipment'
import { RelocationTaskTypeEnum } from 'modules/warehouse/constants/relocationTask'
import { WarehouseTypeEnum } from 'modules/warehouse/constants/warehouse'

import { LocationTypeEnum } from 'shared/constants/catalogs'
import { MaybeUndefined } from 'shared/types/utils'

export const conditionsParamByRelocationTaskType: Partial<
  Record<RelocationTaskTypeEnum, EquipmentConditionEnum[]>
> = {
  [RelocationTaskTypeEnum.Relocation]: [
    EquipmentConditionEnum.Working,
    EquipmentConditionEnum.Broken,
    EquipmentConditionEnum.NonRepairable,
  ],
  [RelocationTaskTypeEnum.Warranty]: [
    EquipmentConditionEnum.Working,
    EquipmentConditionEnum.Broken,
    EquipmentConditionEnum.NonRepairable,
  ],
  [RelocationTaskTypeEnum.Repair]: [
    EquipmentConditionEnum.Working,
    EquipmentConditionEnum.Broken,
    EquipmentConditionEnum.NonRepairable,
  ],
  [RelocationTaskTypeEnum.WriteOff]: [EquipmentConditionEnum.WrittenOff],
}

export const relocateFromLocationTypes: Partial<
  Record<RelocationTaskTypeEnum, LocationTypeEnum[]>
> = {
  [RelocationTaskTypeEnum.Relocation]: [LocationTypeEnum.Warehouse, LocationTypeEnum.Shop],
  [RelocationTaskTypeEnum.WriteOff]: [LocationTypeEnum.Warehouse, LocationTypeEnum.Shop],
}

export const relocateFromWarehouseTypes: Partial<
  Record<RelocationTaskTypeEnum, WarehouseTypeEnum[]>
> = {
  [RelocationTaskTypeEnum.Relocation]: undefined,
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
