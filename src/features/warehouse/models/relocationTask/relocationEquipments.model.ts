import { EquipmentConditionEnum } from 'features/equipments/api/constants'
import { EquipmentCategoryDTO } from 'features/warehouse/models'

import { CurrencyCatalogItemDTO } from 'shared/catalogs/api/dto/currencies'
import { IdType } from 'shared/types/common'
import { MaybeNull } from 'shared/types/utils'

export type RelocationEquipmentListItemModel = {
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

export type RelocationEquipmentsModel = RelocationEquipmentListItemModel[]
