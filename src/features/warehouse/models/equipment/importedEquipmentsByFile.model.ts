import { EquipmentConditionEnum } from 'features/warehouse/constants/equipment'
import {
  CustomerCatalogItemDTO,
  EquipmentCategoryModel,
  NomenclatureModel,
  WorkTypesCatalogItemDTO,
} from 'features/warehouse/models'

import { CurrencyCatalogItemDTO } from 'shared/catalogs/api/dto/currencies'
import { MacroregionCatalogItemDTO } from 'shared/catalogs/api/dto/macroregions'
import { MaybeNull } from 'shared/types/utils'

export type ImportedEquipmentByFileModel = {
  title: MaybeNull<string>
  inventoryNumber: MaybeNull<string>
  serialNumber: MaybeNull<string>
  comment: MaybeNull<string>
  condition: MaybeNull<EquipmentConditionEnum>
  quantity: MaybeNull<number>
  price: MaybeNull<number>
  usageCounter: MaybeNull<number>
  isNew: MaybeNull<boolean>
  isWarranty: MaybeNull<boolean>
  isRepaired: MaybeNull<boolean>
  category: MaybeNull<Pick<EquipmentCategoryModel, 'id' | 'title' | 'code'>>
  currency: MaybeNull<Pick<CurrencyCatalogItemDTO, 'id' | 'title'>>
  owner: MaybeNull<Pick<CustomerCatalogItemDTO, 'id' | 'title'>>
  macroregion: MaybeNull<Pick<MacroregionCatalogItemDTO, 'id' | 'title'>>
  purpose: MaybeNull<Pick<WorkTypesCatalogItemDTO, 'id' | 'title'>>
  nomenclature: MaybeNull<
    Pick<NomenclatureModel, 'id' | 'title' | 'equipmentHasSerialNumber'> & {
      measurementUnit: NomenclatureModel['measurementUnit']['title']
    }
  >
}

export type ImportedEquipmentsByFileModel = ImportedEquipmentByFileModel[]
