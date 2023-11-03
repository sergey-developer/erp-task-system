import { EquipmentConditionEnum } from 'modules/warehouse/constants/equipment'
import { RelocationTaskTypeEnum } from 'modules/warehouse/constants/relocationTask'
import { WarehouseTypeEnum } from 'modules/warehouse/constants/warehouse'

import { LocationTypeEnum } from 'shared/constants/catalogs'
import { MaybeUndefined } from 'shared/types/utils'

export const getConditionsByRelocationTaskType = (
  type: RelocationTaskTypeEnum,
): EquipmentConditionEnum[] => {
  switch (type) {
    case RelocationTaskTypeEnum.Relocation:
    case RelocationTaskTypeEnum.Warranty:
    case RelocationTaskTypeEnum.Repair:
      return [
        EquipmentConditionEnum.Working,
        EquipmentConditionEnum.Broken,
        EquipmentConditionEnum.NonRepairable,
      ]
    case RelocationTaskTypeEnum.WriteOff:
      return [EquipmentConditionEnum.WrittenOff]
  }
}

const getRelocateFromLocationTypes = (
  type: RelocationTaskTypeEnum,
): MaybeUndefined<LocationTypeEnum[]> => {
  switch (type) {
    case RelocationTaskTypeEnum.Relocation:
    case RelocationTaskTypeEnum.WriteOff:
    case RelocationTaskTypeEnum.Repair:
      return [LocationTypeEnum.Warehouse, LocationTypeEnum.Shop]
    case RelocationTaskTypeEnum.Warranty:
      return undefined
  }
}

const getRelocateFromWarehouseTypes = (
  type: RelocationTaskTypeEnum,
): MaybeUndefined<WarehouseTypeEnum[]> => {
  switch (type) {
    case RelocationTaskTypeEnum.WriteOff:
      return [WarehouseTypeEnum.Main, WarehouseTypeEnum.Msi, WarehouseTypeEnum.Repair]
    case RelocationTaskTypeEnum.Repair:
      return [WarehouseTypeEnum.Main, WarehouseTypeEnum.Msi]
    case RelocationTaskTypeEnum.Relocation:
    case RelocationTaskTypeEnum.Warranty:
      return undefined
  }
}

const getRelocateToLocationTypes = (
  type: RelocationTaskTypeEnum,
): MaybeUndefined<LocationTypeEnum[]> => {
  switch (type) {
    case RelocationTaskTypeEnum.Relocation:
      return [LocationTypeEnum.Warehouse, LocationTypeEnum.Shop]
    case RelocationTaskTypeEnum.Repair:
      return [LocationTypeEnum.Warehouse]
    case RelocationTaskTypeEnum.WriteOff:
    case RelocationTaskTypeEnum.Warranty:
      return undefined
  }
}

const getRelocateToWarehouseTypes = (
  type: RelocationTaskTypeEnum,
): MaybeUndefined<WarehouseTypeEnum[]> => {
  switch (type) {
    case RelocationTaskTypeEnum.Relocation:
      return [WarehouseTypeEnum.Main, WarehouseTypeEnum.Msi]
    case RelocationTaskTypeEnum.Repair:
      return [WarehouseTypeEnum.Repair]
    case RelocationTaskTypeEnum.WriteOff:
    case RelocationTaskTypeEnum.Warranty:
      return undefined
  }
}

export const getRelocateFromLocationListParams = (type: RelocationTaskTypeEnum) => ({
  locationTypes: getRelocateFromLocationTypes(type),
  warehouseTypes: getRelocateFromWarehouseTypes(type),
})

export const getRelocateToLocationListParams = (type: RelocationTaskTypeEnum) => ({
  locationTypes: getRelocateToLocationTypes(type),
  warehouseTypes: getRelocateToWarehouseTypes(type),
})
