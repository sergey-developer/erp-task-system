import { IdType } from 'shared/types/common'

export type RelocationEquipmentBalanceDTO = {
  equipmentId: IdType
  amount: number
}

export type RelocationEquipmentBalancesDTO = RelocationEquipmentBalanceDTO[]
