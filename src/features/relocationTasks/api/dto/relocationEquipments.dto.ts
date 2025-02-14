import { EquipmentConditionEnum } from 'features/equipments/api/constants'
import { EquipmentCategoryDTO } from 'features/equipments/api/dto'

import { CurrencyCatalogItemDTO } from 'shared/catalogs/currencies/api/dto'
import { IdType } from 'shared/types/common'
import { MaybeNull } from 'shared/types/utils'

export type RelocationEquipmentDTO = {
  id: IdType
  relocationEquipmentId: IdType
  title: string
  condition: EquipmentConditionEnum
  purpose: string
  quantity: number
  category: Pick<EquipmentCategoryDTO, 'id' | 'title' | 'code'>

  price: MaybeNull<number>
  currency: MaybeNull<CurrencyCatalogItemDTO>
  serialNumber: MaybeNull<string>
}

export type RelocationEquipmentsDTO = RelocationEquipmentDTO[]
