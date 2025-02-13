import { EquipmentConditionEnum } from 'features/warehouse/constants/equipment'
import {
  CustomerCatalogItemDTO,
  EquipmentCategoryListItemModel,
  NomenclatureModel,
  WorkTypeListItemModel,
} from 'features/warehouse/models'

import { CurrencyCatalogItemDTO } from 'shared/catalogs/api/dto/currencies'
import { MacroregionCatalogItemDTO } from 'shared/catalogs/api/dto/macroregions'
import { IdType } from 'shared/types/common'
import { MaybeNull } from 'shared/types/utils'

export type CheckedInventorizationEquipmentsTemplateListItemModel = {
  isCredited: boolean
  title?: string
  serialNumber?: string
  inventoryNumber?: string
  nomenclature?: Pick<NomenclatureModel, 'id' | 'title' | 'vendorCode'>
  condition?: EquipmentConditionEnum
  price?: number
  currency?: Pick<CurrencyCatalogItemDTO, 'id' | 'title'>
  category?: Pick<EquipmentCategoryListItemModel, 'id' | 'title' | 'code'>
  isNew?: boolean
  isWarranty?: boolean
  isRepaired?: boolean
  usageCounter?: number
  owner?: Pick<CustomerCatalogItemDTO, 'id' | 'title'>
  macroregion?: Pick<MacroregionCatalogItemDTO, 'id' | 'title'>
  purpose?: Pick<WorkTypeListItemModel, 'id' | 'title'>
  comment?: string
  quantityFact?: number
  locationFact?: {
    id: MaybeNull<IdType>
    title: string
  }
}

export type CheckedInventorizationEquipmentsTemplateModel =
  CheckedInventorizationEquipmentsTemplateListItemModel[]
