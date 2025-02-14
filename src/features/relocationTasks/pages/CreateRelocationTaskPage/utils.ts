import { EquipmentConditionEnum } from 'features/equipments/api/constants'
import { EquipmentFormModalProps } from 'features/equipments/components/EquipmentFormModal/types'
import { EquipmentByFileTableRow } from 'features/equipments/components/EquipmentsByFileTable/types'
import {
  checkRelocationTaskTypeIsCustomer,
  checkRelocationTaskTypeIsWarranty,
} from 'features/relocationTasks/api/helpers'
import { LocationOption } from 'features/relocationTasks/components/RelocationTaskForm/types'
import { RelocationTaskTypeEnum } from 'features/relocationTasks/constants'
import { WarehouseTypeEnum } from 'features/warehouse/constants/warehouse'
import { GetEquipmentsCatalogRequest } from 'features/warehouse/models'
import isBoolean from 'lodash/isBoolean'
import isNumber from 'lodash/isNumber'

import { GetLocationsCatalogRequest } from 'shared/catalogs/api/dto/locations'
import { LocationTypeEnum } from 'shared/catalogs/constants'
import { checkLocationTypeIsWarehouse } from 'shared/catalogs/locations/helpers/checkLocationType'
import { MaybeUndefined } from 'shared/types/utils'

const getConditionsByType = (
  type: RelocationTaskTypeEnum,
): MaybeUndefined<EquipmentConditionEnum[]> => {
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
    case RelocationTaskTypeEnum.Customer:
      return undefined
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
    case RelocationTaskTypeEnum.Customer:
      return [LocationTypeEnum.Shop]
    case RelocationTaskTypeEnum.EnteringBalances:
      return undefined
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
    case RelocationTaskTypeEnum.Customer:
    case RelocationTaskTypeEnum.EnteringBalances:
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
    case RelocationTaskTypeEnum.Customer:
    case RelocationTaskTypeEnum.EnteringBalances:
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
    case RelocationTaskTypeEnum.Customer:
      return [WarehouseTypeEnum.Main, WarehouseTypeEnum.Msi]
    case RelocationTaskTypeEnum.Repair:
      return [WarehouseTypeEnum.Repair]
    case RelocationTaskTypeEnum.EnteringBalances:
      return [WarehouseTypeEnum.Main, WarehouseTypeEnum.Repair, WarehouseTypeEnum.Msi]
    case RelocationTaskTypeEnum.WriteOff:
    case RelocationTaskTypeEnum.Warranty:
      return undefined
  }
}

export const getEquipmentsCatalogParams = (
  type: RelocationTaskTypeEnum,
): Pick<GetEquipmentsCatalogRequest, 'conditions' | 'isWarranty' | 'isCredited'> => ({
  conditions: getConditionsByType(type),
  isWarranty: checkRelocationTaskTypeIsWarranty(type) ? true : undefined,
  isCredited: checkRelocationTaskTypeIsCustomer(type) ? false : undefined,
})

export const getRelocateFromLocationsParams = (
  type: RelocationTaskTypeEnum,
): Pick<GetLocationsCatalogRequest, 'locationTypes' | 'warehouseTypes'> => ({
  locationTypes: getRelocateFromLocationTypes(type),
  warehouseTypes: getRelocateFromWarehouseTypes(type),
})

export const getRelocateToLocationsParams = (
  type: RelocationTaskTypeEnum,
): Pick<GetLocationsCatalogRequest, 'locationTypes' | 'warehouseTypes'> => ({
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
        macroregion: equipment.macroregion?.id,
        comment: equipment.comment || undefined,
      }
    : {}

export const checkCreateEquipmentBtnEnabled = (
  typeIsEnteringBalances: boolean,
  relocateFrom?: LocationOption,
  relocateTo?: LocationOption,
): boolean =>
  (!!relocateFrom || typeIsEnteringBalances) &&
  !!relocateTo &&
  checkLocationTypeIsWarehouse(relocateTo.type)
