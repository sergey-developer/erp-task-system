import { EquipmentConditionEnum } from 'modules/warehouse/constants/equipment'
import {
  CustomerListItemModel,
  EquipmentCategoryListItemModel,
  NomenclatureModel,
  WorkTypeListItemModel,
} from 'modules/warehouse/models'

import { LocationCatalogListItemModel } from 'shared/models/catalogs/locations'
import { CurrencyListItemModel } from 'shared/models/currency'
import { MacroregionListItemModel } from 'shared/models/macroregion'

export type CheckedInventorizationEquipmentModel = {
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
  isCredited?: boolean
  usageCounter?: number
  owner?: Pick<CustomerListItemModel, 'id' | 'title'>
  macroregion?: Pick<MacroregionListItemModel, 'id' | 'title'>
  purpose?: Pick<WorkTypeListItemModel, 'id' | 'title'>
  comment?: string
  quantityFact?: number
  locationFact?: Pick<LocationCatalogListItemModel, 'id' | 'title'>
}

export type CheckedInventorizationEquipmentsModel = CheckedInventorizationEquipmentModel[]
