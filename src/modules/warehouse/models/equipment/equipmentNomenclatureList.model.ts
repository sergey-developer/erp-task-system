import { NomenclatureGroupModel } from 'modules/warehouse/models'

import { IdType } from 'shared/types/common'

export type EquipmentNomenclatureListItemModel = {
  id: IdType
  title: string
  quantity: number
  group: NomenclatureGroupModel
}

export type EquipmentNomenclaturesModel = EquipmentNomenclatureListItemModel[]
