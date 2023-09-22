import { RelocationEquipmentModel } from 'modules/warehouse/models'

export type RelocationEquipmentListItemModel = Pick<
  RelocationEquipmentModel,
  'id' | 'title' | 'serialNumber' | 'condition' | 'purpose' | 'quantity'
>

export type RelocationEquipmentListModel = RelocationEquipmentListItemModel[]
