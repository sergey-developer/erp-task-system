import { IdType } from 'shared/types/common'
import { MaybeNull } from 'shared/types/utils'

export type RelocationEquipmentModel = {
  id: IdType
  title: string
  condition: string
  purpose: string
  quantity: number

  serialNumber: MaybeNull<string>
}
