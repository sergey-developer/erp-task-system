import { UserModel } from 'modules/user/models'
import { EquipmentConditionEnum } from 'modules/warehouse/constants'
import {
  CurrencyModel,
  CustomerModel,
  EquipmentCategoryModel,
  MeasurementUnitModel,
  NomenclatureModel,
  WarehouseModel,
  WorkTypeModel,
} from 'modules/warehouse/models'

import { MaybeNull } from 'shared/types/utils'

export type EquipmentModel = {
  id: number
  title: string
  nomenclature: Pick<NomenclatureModel, 'id' | 'title' | 'equipmentHasSerialNumber'>
  condition: EquipmentConditionEnum
  createdAt: string
  createdBy: Pick<UserModel, 'id' | 'fullName'>
  measurementUnit: Pick<MeasurementUnitModel, 'id' | 'title'>
  category: Pick<EquipmentCategoryModel, 'id' | 'title' | 'code'>
  isNew: boolean
  isWarranty: boolean
  isRepaired: boolean
  purpose: Pick<WorkTypeModel, 'id' | 'title'>

  warehouse: MaybeNull<Pick<WarehouseModel, 'id' | 'title'>>
  customerInventoryNumber: MaybeNull<string>
  inventoryNumber: MaybeNull<string>
  serialNumber: MaybeNull<string>
  quantity: MaybeNull<number>
  price: MaybeNull<number>
  currency: MaybeNull<Pick<CurrencyModel, 'id' | 'title'>>
  usageCounter: MaybeNull<number>
  owner: MaybeNull<Pick<CustomerModel, 'id' | 'title'>>
  comment: MaybeNull<string>
}
