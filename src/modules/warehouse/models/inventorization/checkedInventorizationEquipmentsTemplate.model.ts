import { EquipmentConditionEnum } from 'modules/warehouse/constants/equipment'
import {
  CustomerListItemModel,
  EquipmentCategoryListItemModel,
  NomenclatureModel,
  WorkTypeListItemModel,
} from 'modules/warehouse/models'

import { CurrencyListItemModel } from 'shared/models/currency'
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
