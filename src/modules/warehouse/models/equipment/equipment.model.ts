import { UserModel } from 'modules/user/models'
import { EquipmentConditionEnum } from 'modules/warehouse/constants/equipment'
import {
  CustomerModel,
  EquipmentCategoryModel,
  MeasurementUnitModel,
  NomenclatureModel,
  WarehouseModel,
  WorkTypeListItemModel,
} from 'modules/warehouse/models'

import { LocationCatalogListItemModel } from 'shared/models/catalogs/locations'
import { CurrencyListItemModel } from 'shared/models/currency'
import { MacroregionListItemModel } from 'shared/models/macroregion'
import { IdType } from 'shared/types/common'
import { MaybeNull } from 'shared/types/utils'

export type EquipmentModel = {
  id: IdType
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
  isCredited: boolean
  purpose: Pick<WorkTypeListItemModel, 'id' | 'title'>
  amount: number

  location: MaybeNull<Pick<LocationCatalogListItemModel, 'id' | 'title'>>
  warehouse: MaybeNull<Pick<WarehouseModel, 'id' | 'title'>>
  inventoryNumber: MaybeNull<string>
  serialNumber: MaybeNull<string>
  quantity: MaybeNull<number>
  price: MaybeNull<number>
  currency: MaybeNull<Pick<CurrencyListItemModel, 'id' | 'title'>>
  usageCounter: MaybeNull<number>
  owner: MaybeNull<Pick<CustomerModel, 'id' | 'title'>>
  macroregion: MaybeNull<Pick<MacroregionListItemModel, 'id' | 'title'>>
  comment: MaybeNull<string>
  qrCode: MaybeNull<string>
}
