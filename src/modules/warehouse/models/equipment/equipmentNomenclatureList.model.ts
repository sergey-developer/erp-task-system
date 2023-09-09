import { IdType } from 'shared/types/common'

export type EquipmentNomenclatureListItemModel = {
  id: IdType
  title: string
  quantity: number
}

export type EquipmentNomenclatureListModel = EquipmentNomenclatureListItemModel[]
