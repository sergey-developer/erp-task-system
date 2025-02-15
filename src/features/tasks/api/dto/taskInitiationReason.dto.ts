import { IdType } from 'shared/types/common'
import { MaybeNull } from 'shared/types/utils'

export type TaskInitiationReasonDTO = {
  id: IdType
  title: string
  equipmentType: string
  malfunction: string
  inventoryNumber: MaybeNull<string>
}
