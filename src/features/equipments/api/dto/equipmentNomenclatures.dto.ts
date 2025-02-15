import { NomenclaturesGroupDTO } from 'features/warehouses/api/dto'

import { IdType } from 'shared/types/common'

export type EquipmentNomenclatureDTO = {
  id: IdType
  title: string
  quantity: number
  group: NomenclaturesGroupDTO
}

export type EquipmentNomenclaturesDTO = EquipmentNomenclatureDTO[]
