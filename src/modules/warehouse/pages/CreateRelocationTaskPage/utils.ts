import isBoolean from 'lodash/isBoolean'
import isNumber from 'lodash/isNumber'

import { EquipmentFormModalProps } from 'modules/warehouse/components/EquipmentFormModal/types'
import { EquipmentByFileTableRow } from 'modules/warehouse/components/EquipmentsByFileTable/types'
import { EquipmentConditionEnum } from 'modules/warehouse/constants/equipment'
import { RelocationTaskTypeEnum } from 'modules/warehouse/constants/relocationTask'
import { WarehouseTypeEnum } from 'modules/warehouse/constants/warehouse'
import { GetEquipmentCatalogListQueryArgs } from 'modules/warehouse/models'
import { checkRelocationTaskTypeIsWarranty } from 'modules/warehouse/utils/relocationTask'

import { LocationTypeEnum } from 'shared/constants/catalogs'
import { GetLocationsQueryArgs } from 'shared/models/catalogs/location'
import { MaybeUndefined } from 'shared/types/utils'

const getConditionsByType = (type: RelocationTaskTypeEnum): EquipmentConditionEnum[] => {
  switch (type) {
    case RelocationTaskTypeEnum.Relocation:
    case RelocationTaskTypeEnum.Warranty:
    case RelocationTaskTypeEnum.Repair:
    case RelocationTaskTypeEnum.WriteOff:
      return [
        EquipmentConditionEnum.Working,
        EquipmentConditionEnum.Broken,
        EquipmentConditionEnum.NonRepairable,
      ]
  }
}

const getRelocateFromLocationTypes = (
  type: RelocationTaskTypeEnum,
): MaybeUndefined<LocationTypeEnum[]> => {
  switch (type) {
    case RelocationTaskTypeEnum.Relocation:
    case RelocationTaskTypeEnum.WriteOff:
      return [LocationTypeEnum.Warehouse, LocationTypeEnum.Shop, LocationTypeEnum.ServiceCenter]
    case RelocationTaskTypeEnum.Repair:
      return [LocationTypeEnum.Warehouse, LocationTypeEnum.Shop]
    case RelocationTaskTypeEnum.Warranty:
      return [LocationTypeEnum.Warehouse]
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
    case RelocationTaskTypeEnum.Warranty:
      return [LocationTypeEnum.ServiceCenter]
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
    case RelocationTaskTypeEnum.Warranty:
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
): Pick<GetLocationsQueryArgs, 'locationTypes' | 'warehouseTypes'> => ({
  locationTypes: getRelocateFromLocationTypes(type),
  warehouseTypes: getRelocateFromWarehouseTypes(type),
})

export const getRelocateToLocationListParams = (
  type: RelocationTaskTypeEnum,
): Pick<GetLocationsQueryArgs, 'locationTypes' | 'warehouseTypes'> => ({
  locationTypes: getRelocateToLocationTypes(type),
  warehouseTypes: getRelocateToWarehouseTypes(type),
})

export const getEquipmentFormInitialValues = (
  equipment?: EquipmentByFileTableRow,
): EquipmentFormModalProps['initialValues'] =>
  equipment
    ? {
        nomenclature: equipment.nomenclature?.id,
        condition: equipment.condition || undefined,
        category: equipment.category?.id,
        purpose: equipment.purpose?.id,
        isNew: isBoolean(equipment.isNew) ? equipment.isNew : undefined,
        isWarranty: isBoolean(equipment.isWarranty) ? equipment.isWarranty : undefined,
        isRepaired: isBoolean(equipment.isRepaired) ? equipment.isRepaired : undefined,
        title: equipment.nomenclature?.title,
        currency: equipment.currency?.id,
        inventoryNumber: equipment.inventoryNumber || undefined,
        serialNumber: equipment.serialNumber || undefined,
        quantity: isNumber(equipment.quantity) ? equipment.quantity : undefined,
        price: isNumber(equipment.price) ? equipment.price : undefined,
        usageCounter: isNumber(equipment.usageCounter) ? equipment.usageCounter : undefined,
        owner: equipment.owner?.id,
        comment: equipment.comment || undefined,
      }
    : {}
