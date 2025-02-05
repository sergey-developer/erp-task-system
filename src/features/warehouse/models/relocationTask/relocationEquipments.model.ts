import { EquipmentConditionEnum } from 'features/warehouse/constants/equipment'
import { EquipmentCategoryModel } from 'features/warehouse/models'

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
  category: Pick<EquipmentCategoryModel, 'id' | 'title' | 'code'>

  price: MaybeNull<number>
  currency: MaybeNull<CurrencyCatalogItemDTO>
  serialNumber: MaybeNull<string>
}

export type RelocationEquipmentsModel = RelocationEquipmentListItemModel[]
