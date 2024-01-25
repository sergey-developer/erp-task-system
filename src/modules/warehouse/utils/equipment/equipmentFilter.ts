import { EquipmentFilterFormFields } from 'modules/warehouse/components/EquipmentFilter/types'
import { EquipmentFilterParams } from 'modules/warehouse/types'

import { DATE_FILTER_FORMAT } from 'shared/constants/dateTime'
import { formatDate } from 'shared/utils/date'

export const equipmentFilterToParams = ({
  createdAt,
  ...values
}: EquipmentFilterFormFields): EquipmentFilterParams => {
  return {
    ...values,
    createdAtFrom: createdAt?.[0] ? formatDate(createdAt[0], DATE_FILTER_FORMAT) : undefined,
    createdAtTo: createdAt?.[1] ? formatDate(createdAt[1], DATE_FILTER_FORMAT) : undefined,
  }
}
