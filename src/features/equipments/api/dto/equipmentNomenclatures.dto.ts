import { NomenclaturesGroupDTO } from 'features/nomenclatures/api/dto'

import { IdType } from 'shared/types/common'

export type EquipmentNomenclatureDTO = {
  id: IdType
  title: string
  quantity: number
  group: NomenclaturesGroupDTO
}

export type EquipmentNomenclaturesDTO = EquipmentNomenclatureDTO[]
