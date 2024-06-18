import { EquipmentConditionEnum } from 'modules/warehouse/constants/equipment'
import {
  CustomerModel,
  EquipmentCategoryModel,
  NomenclatureModel,
  WorkTypeModel,
} from 'modules/warehouse/models'

import { CurrencyModel } from 'shared/models/currency'
import { MacroregionListItemModel } from 'shared/models/macroregion'
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
  currency: MaybeNull<Pick<CurrencyModel, 'id' | 'title'>>
  owner: MaybeNull<Pick<CustomerModel, 'id' | 'title'>>
  macroregion: MaybeNull<Pick<MacroregionListItemModel, 'id' | 'title'>>
  purpose: MaybeNull<Pick<WorkTypeModel, 'id' | 'title'>>
  nomenclature: MaybeNull<
    Pick<NomenclatureModel, 'id' | 'title' | 'equipmentHasSerialNumber'> & {
      measurementUnit: NomenclatureModel['measurementUnit']['title']
    }
  >
}

export type ImportedEquipmentsByFileModel = ImportedEquipmentByFileModel[]
