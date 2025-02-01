import { UserModel } from 'features/user/models'
import { EquipmentConditionEnum } from 'features/warehouse/constants/equipment'
import {
  CustomerModel,
  EquipmentCategoryModel,
  MeasurementUnitModel,
  NomenclatureModel,
  WarehouseModel,
  WorkTypeListItemModel,
} from 'features/warehouse/models'

import { CurrencyCatalogItemDTO } from 'shared/catalogs/api/dto/currencies'
import { LocationCatalogItemDTO } from 'shared/catalogs/api/dto/locations'
import { MacroregionCatalogItemDTO } from 'shared/catalogs/api/dto/macroregions'
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

  location: MaybeNull<Pick<LocationCatalogItemDTO, 'id' | 'title'>>
  warehouse: MaybeNull<Pick<WarehouseModel, 'id' | 'title'>>
  inventoryNumber: MaybeNull<string>
  serialNumber: MaybeNull<string>
  quantity: MaybeNull<number>
  price: MaybeNull<number>
  currency: MaybeNull<Pick<CurrencyCatalogItemDTO, 'id' | 'title'>>
  usageCounter: MaybeNull<number>
  owner: MaybeNull<Pick<CustomerModel, 'id' | 'title'>>
  macroregion: MaybeNull<Pick<MacroregionCatalogItemDTO, 'id' | 'title'>>
  comment: MaybeNull<string>
  qrCode: MaybeNull<string>
}
