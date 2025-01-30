import { EquipmentConditionEnum } from 'features/warehouse/constants/equipment'
import {
  CustomerListItemModel,
  EquipmentCategoryListItemModel,
  NomenclatureModel,
  WorkTypeListItemModel,
} from 'features/warehouse/models'

import { CurrencyListItemModel } from 'shared/catalogs/models/currencies'
import { MacroregionListItemModel } from 'shared/models/macroregion'
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
  currency?: Pick<CurrencyListItemModel, 'id' | 'title'>
  category?: Pick<EquipmentCategoryListItemModel, 'id' | 'title' | 'code'>
  isNew?: boolean
  isWarranty?: boolean
  isRepaired?: boolean
  usageCounter?: number
  owner?: Pick<CustomerListItemModel, 'id' | 'title'>
  macroregion?: Pick<MacroregionListItemModel, 'id' | 'title'>
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
