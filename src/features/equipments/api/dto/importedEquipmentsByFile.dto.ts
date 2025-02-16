import { EquipmentConditionEnum } from 'features/equipments/api/constants'
import { NomenclatureDetailDTO } from 'features/nomenclatures/api/dto'

import { CurrencyCatalogItemDTO } from 'shared/catalogs/currencies/api/dto'
import { CustomerCatalogItemDTO } from 'shared/catalogs/customers/api/dto'
import { MacroregionCatalogItemDTO } from 'shared/catalogs/macroregions/api/dto'
import { WorkTypesCatalogItemDTO } from 'shared/catalogs/workTypes/api/dto'
import { MaybeNull } from 'shared/types/utils'

import { EquipmentCategoryDTO } from './equipmentCategories.dto'

export type ImportedEquipmentByFileDTO = {
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
  category: MaybeNull<Pick<EquipmentCategoryDTO, 'id' | 'title' | 'code'>>
  currency: MaybeNull<Pick<CurrencyCatalogItemDTO, 'id' | 'title'>>
  owner: MaybeNull<Pick<CustomerCatalogItemDTO, 'id' | 'title'>>
  macroregion: MaybeNull<Pick<MacroregionCatalogItemDTO, 'id' | 'title'>>
  purpose: MaybeNull<Pick<WorkTypesCatalogItemDTO, 'id' | 'title'>>
  nomenclature: MaybeNull<
    Pick<NomenclatureDetailDTO, 'id' | 'title' | 'equipmentHasSerialNumber'> & {
      measurementUnit: NomenclatureDetailDTO['measurementUnit']['title']
    }
  >
}

export type ImportedEquipmentsByFileDTO = ImportedEquipmentByFileDTO[]
