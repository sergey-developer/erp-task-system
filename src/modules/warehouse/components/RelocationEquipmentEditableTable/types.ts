import { EquipmentConditionEnum } from 'modules/warehouse/constants/equipment'

import { IdType } from 'shared/types/common'

export type RelocationEquipmentFormFields = {
  rowId: number
  id?: IdType
  serialNumber?: string
  purpose?: string
  condition?: EquipmentConditionEnum
  amount?: number
  price?: number
  currency?: IdType
  quantity?: number
}

export type RelocationEquipmentEditableTableProps = {}
