import { EquipmentConditionEnum } from 'modules/warehouse/constants/equipment'
import { RelocationTaskTypeEnum } from 'modules/warehouse/constants/relocationTask'
import { WarehouseTypeEnum } from 'modules/warehouse/constants/warehouse'
import { GetEquipmentCatalogListQueryArgs } from 'modules/warehouse/models'
import { checkRelocationTaskTypeIsWarranty } from 'modules/warehouse/utils/relocationTask'

import { LocationTypeEnum } from 'shared/constants/catalogs'
import { GetLocationListQueryArgs } from 'shared/models/catalogs/location'
import { MaybeUndefined } from 'shared/types/utils'

const getConditionsByType = (type: RelocationTaskTypeEnum): EquipmentConditionEnum[] => {
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
      return [LocationTypeEnum.Warehouse, LocationTypeEnum.Shop]
    case RelocationTaskTypeEnum.WriteOff:
      return [LocationTypeEnum.Warehouse, LocationTypeEnum.Shop, LocationTypeEnum.ServiceCenter]
    case RelocationTaskTypeEnum.Repair:
      return [LocationTypeEnum.Warehouse, LocationTypeEnum.Shop]
  }
}

const getRelocateFromWarehouseTypes = (
  type: RelocationTaskTypeEnum,
): MaybeUndefined<WarehouseTypeEnum[]> => {
  switch (type) {
    case RelocationTaskTypeEnum.Repair:
      return [WarehouseTypeEnum.Main, WarehouseTypeEnum.Msi]
    case RelocationTaskTypeEnum.WriteOff:
      return [WarehouseTypeEnum.Main, WarehouseTypeEnum.Msi, WarehouseTypeEnum.Repair]
    case RelocationTaskTypeEnum.Relocation:
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
      return undefined
  }
}

export const getEquipmentCatalogListParams = (
  type: RelocationTaskTypeEnum,
): Pick<GetEquipmentCatalogListQueryArgs, 'conditions' | 'isWarranty'> => ({
  conditions: getConditionsByType(type),
  isWarranty: checkRelocationTaskTypeIsWarranty(type) ? true : undefined,
})

export const getRelocateFromLocationListParams = (
  type: RelocationTaskTypeEnum,
): Pick<GetLocationListQueryArgs, 'locationTypes' | 'warehouseTypes'> => ({
  locationTypes: getRelocateFromLocationTypes(type),
  warehouseTypes: getRelocateFromWarehouseTypes(type),
})

export const getRelocateToLocationListParams = (
  type: RelocationTaskTypeEnum,
): Pick<GetLocationListQueryArgs, 'locationTypes' | 'warehouseTypes'> => ({
  locationTypes: getRelocateToLocationTypes(type),
  warehouseTypes: getRelocateToWarehouseTypes(type),
})
