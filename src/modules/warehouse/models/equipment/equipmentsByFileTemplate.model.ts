import { EquipmentConditionEnum } from 'modules/warehouse/constants/equipment'
import {
  CustomerModel,
  EquipmentCategoryModel,
  NomenclatureModel,
  WorkTypeModel,
} from 'modules/warehouse/models'

import { CurrencyModel } from 'shared/models/currency'
import { IdType } from 'shared/types/common'
import { MaybeNull } from 'shared/types/utils'

export type EquipmentByFileTemplateModel = {
  id: IdType
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
  category: MaybeNull<Pick<EquipmentCategoryModel, 'id' | 'title'>>
  currency: MaybeNull<Pick<CurrencyModel, 'id' | 'title'>>
  owner: MaybeNull<Pick<CustomerModel, 'id' | 'title'>>
  purpose: MaybeNull<Pick<WorkTypeModel, 'id' | 'title'>>
  nomenclature: MaybeNull<
    Pick<NomenclatureModel, 'id' | 'title'> & {
      measurementUnit: NomenclatureModel['measurementUnit']['title']
    }
  >
}

export type EquipmentsByFileTemplateModel = EquipmentByFileTemplateModel[]
