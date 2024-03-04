import { EquipmentConditionEnum } from 'modules/warehouse/constants/equipment'
import { EquipmentModel, MeasurementUnitModel } from 'modules/warehouse/models'

import { IdType } from 'shared/types/common'
import { MaybeNull } from 'shared/types/utils'

export type TaskCompletionDocumentModel = {
  initiationReasons: MaybeNull<
    {
      id: IdType
      title: string
      equipmentType: string
      malfunction: string
      inventoryNumber: MaybeNull<string>
    }[]
  >
  workList: MaybeNull<
    {
      id: IdType
      title: string
      quantity: string
      measurementUnit: Pick<MeasurementUnitModel, 'id' | 'title'>
    }[]
  >
  relocationTasks: MaybeNull<
    {
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
    }[]
  >
}
