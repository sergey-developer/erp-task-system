import { Moment } from 'moment-timezone'

import { EquipmentConditionEnum } from 'modules/warehouse/constants/equipment'

import { IdType } from 'shared/types/common'

export type CreateRelocationTaskFormFields = {
  equipments: {
    id: IdType
    quantity: number
    condition: EquipmentConditionEnum

    serialNumber?: string
    purpose?: string
    amount?: number
    price?: number
    currency?: IdType
  }[]
  deadlineAtDate: Moment
  deadlineAtTime: Moment
  relocateFrom: IdType
  relocateTo: IdType
  executor: IdType

  comment?: string
}
