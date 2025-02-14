import { NomenclatureGroupModel } from 'features/warehouse/models'

import { IdType } from 'shared/types/common'

export type EquipmentNomenclatureDTO = {
  id: IdType
  title: string
  quantity: number
  group: NomenclatureGroupModel
}

export type EquipmentNomenclaturesDTO = EquipmentNomenclatureDTO[]
