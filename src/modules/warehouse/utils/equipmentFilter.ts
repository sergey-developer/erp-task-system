import { EquipmentFilterFormFields } from 'modules/warehouse/components/EquipmentFilter/types'
import { EquipmentFilterParams } from 'modules/warehouse/types'

export const equipmentFilterToParams = (
  values: EquipmentFilterFormFields,
): EquipmentFilterParams => {
  const {
    conditions,
    warehouses,
    owners,
    categories,
    isRepaired,
    isNew,
    isWarranty,
    priceFrom,
    priceTo,
    createdAt,
  } = values

  return {
    conditions,
    warehouses,
    owners,
    categories,
    isRepaired,
    isNew,
    isWarranty,
    priceFrom,
    priceTo,
    createdAtFrom: createdAt?.[0] ? createdAt[0].toISOString() : undefined,
    createdAtTo: createdAt?.[1] ? createdAt[1].toISOString() : undefined,
  }
}
