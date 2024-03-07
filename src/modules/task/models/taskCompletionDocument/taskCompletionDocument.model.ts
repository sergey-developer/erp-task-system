import { CompletedWorkModel, InitiationReasonModel } from 'modules/task/models'
import { EquipmentConditionEnum } from 'modules/warehouse/constants/equipment'
import { EquipmentModel } from 'modules/warehouse/models'

import { IdType } from 'shared/types/common'
import { MaybeNull } from 'shared/types/utils'

export type TaskCompletionDocumentRelocationTask = {
  id: IdType
  relocateFrom: MaybeNull<{
    id: IdType
    title: string
  }>
  relocateTo: MaybeNull<{
    id: IdType
    title: string
  }>
  relocationEquipments: {
    id: IdType
    condition: EquipmentConditionEnum
    equipment: Pick<EquipmentModel, 'id' | 'title' | 'serialNumber'>
  }[]
}

export type TaskCompletionDocumentModel = {
  initiationReasons: MaybeNull<InitiationReasonModel[]>
  workList: MaybeNull<CompletedWorkModel[]>
  relocationTasks: MaybeNull<TaskCompletionDocumentRelocationTask[]>
}
