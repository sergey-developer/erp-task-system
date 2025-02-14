import { EquipmentConditionEnum } from 'features/equipments/api/constants'
import { EquipmentCategoryDTO, NomenclatureModel } from 'features/warehouse/models'

import { CurrencyCatalogItemDTO } from 'shared/catalogs/currencies/api/dto'
import { CustomerCatalogItemDTO } from 'shared/catalogs/customers/api/dto'
import { MacroregionCatalogItemDTO } from 'shared/catalogs/macroregions/api/dto'
import { WorkTypesCatalogItemDTO } from 'shared/catalogs/workTypes/api/dto'
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
  category?: Pick<EquipmentCategoryDTO, 'id' | 'title' | 'code'>
  isNew?: boolean
  isWarranty?: boolean
  isRepaired?: boolean
  usageCounter?: number
  owner?: Pick<CustomerCatalogItemDTO, 'id' | 'title'>
  macroregion?: Pick<MacroregionCatalogItemDTO, 'id' | 'title'>
  purpose?: Pick<WorkTypesCatalogItemDTO, 'id' | 'title'>
  comment?: string
  quantityFact?: number
  locationFact?: {
    id: MaybeNull<IdType>
    title: string
  }
}

export type CheckedInventorizationEquipmentsTemplateModel =
  CheckedInventorizationEquipmentsTemplateListItemModel[]
