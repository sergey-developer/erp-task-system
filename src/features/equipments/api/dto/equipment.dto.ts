import { EquipmentConditionEnum } from 'features/equipments/api/constants'
import { UserDetailDTO } from 'features/users/api/dto'
import { NomenclatureModel, WarehouseModel } from 'features/warehouse/models'

import { CurrencyCatalogItemDTO } from 'shared/catalogs/currencies/api/dto'
import { CustomerCatalogItemDTO } from 'shared/catalogs/customers/api/dto'
import { LocationCatalogItemDTO } from 'shared/catalogs/locations/api/dto'
import { MacroregionCatalogItemDTO } from 'shared/catalogs/macroregions/api/dto'
import { MeasurementUnitsCatalogItemDTO } from 'shared/catalogs/measurementUnits/api/dto'
import { WorkTypesCatalogItemDTO } from 'shared/catalogs/workTypes/api/dto'
import { IdType } from 'shared/types/common'
import { MaybeNull } from 'shared/types/utils'

import { EquipmentCategoryDTO } from './equipmentCategories.dto'

export type EquipmentDetailDTO = {
  id: IdType
  title: string
  nomenclature: Pick<NomenclatureModel, 'id' | 'title' | 'equipmentHasSerialNumber'>
  condition: EquipmentConditionEnum
  createdAt: string
  createdBy: Pick<UserDetailDTO, 'id' | 'fullName'>
  measurementUnit: Pick<MeasurementUnitsCatalogItemDTO, 'id' | 'title'>
  category: Pick<EquipmentCategoryDTO, 'id' | 'title' | 'code'>
  isNew: boolean
  isWarranty: boolean
  isRepaired: boolean
  isCredited: boolean
  purpose: Pick<WorkTypesCatalogItemDTO, 'id' | 'title'>
  amount: number

  location: MaybeNull<Pick<LocationCatalogItemDTO, 'id' | 'title'>>
  warehouse: MaybeNull<Pick<WarehouseModel, 'id' | 'title'>>
  inventoryNumber: MaybeNull<string>
  serialNumber: MaybeNull<string>
  quantity: MaybeNull<number>
  price: MaybeNull<number>
  currency: MaybeNull<Pick<CurrencyCatalogItemDTO, 'id' | 'title'>>
  usageCounter: MaybeNull<number>
  owner: MaybeNull<Pick<CustomerCatalogItemDTO, 'id' | 'title'>>
  macroregion: MaybeNull<Pick<MacroregionCatalogItemDTO, 'id' | 'title'>>
  comment: MaybeNull<string>
  qrCode: MaybeNull<string>
}
