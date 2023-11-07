import { Moment } from 'moment-timezone'

import { EquipmentConditionEnum } from 'modules/warehouse/constants/equipment'
import { RelocationTaskTypeEnum } from 'modules/warehouse/constants/relocationTask'
import { EquipmentModel } from 'modules/warehouse/models'

import { IdType } from 'shared/types/common'

export type RelocationTaskFormEquipment = {
  rowId: number
  id: IdType
  quantity: number
  condition: EquipmentConditionEnum

  serialNumber?: string
  purpose?: string
  amount?: number
  price?: number
  currency?: IdType
  category?: EquipmentModel['category']
}

export type RelocationTaskFormFields = {
  type: RelocationTaskTypeEnum
  equipments: RelocationTaskFormEquipment[]
  deadlineAtDate: Moment
  deadlineAtTime: Moment
  relocateFrom: IdType
  relocateTo?: IdType
  executor: IdType

  comment?: string
}
