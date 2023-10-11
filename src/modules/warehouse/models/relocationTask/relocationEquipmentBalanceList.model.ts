import { IdType } from 'shared/types/common'

export type RelocationEquipmentBalanceListItemModel = {
  equipmentId: IdType
  amount: number
}

export type RelocationEquipmentBalanceListModel = RelocationEquipmentBalanceListItemModel[]
