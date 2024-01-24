import { EquipmentFilterFormFields } from 'modules/warehouse/components/EquipmentFilter/types'
import { EquipmentFilterParams } from 'modules/warehouse/types'

import { DATE_FILTER_FORMAT } from 'shared/constants/dateTime'
import { formatDate } from 'shared/utils/date'

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
    zeroQuantity,
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
    createdAtFrom: createdAt?.[0] ? formatDate(createdAt[0], DATE_FILTER_FORMAT) : undefined,
    createdAtTo: createdAt?.[1] ? formatDate(createdAt[1], DATE_FILTER_FORMAT) : undefined,
    quantityGt: zeroQuantity ? undefined : 0,
  }
}
