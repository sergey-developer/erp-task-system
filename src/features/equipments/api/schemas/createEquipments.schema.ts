import { EquipmentConditionEnum } from 'features/equipments/api/constants'

import { FieldsErrors } from 'shared/api/baseApi'
import { CurrencyCatalogItemDTO } from 'shared/catalogs/currencies/api/dto'
import { CustomerCatalogItemDTO } from 'shared/catalogs/customers/api/dto'
import { MacroregionCatalogItemDTO } from 'shared/catalogs/macroregions/api/dto'
import { WorkTypesCatalogItemDTO } from 'shared/catalogs/workTypes/api/dto'
import { IdType } from 'shared/types/common'
import { MaybeNull } from 'shared/types/utils'

import { EquipmentCategoryDTO, EquipmentNomenclatureDTO } from '../dto'

export type CreatedEquipmentDTO = {
  id: IdType
  nomenclature: Pick<EquipmentNomenclatureDTO, 'id' | 'title'>
  title: string
  condition: EquipmentConditionEnum
  quantity: number
  availableQuantity: number
  category: Pick<EquipmentCategoryDTO, 'id' | 'title' | 'code'>
  purpose: Pick<WorkTypesCatalogItemDTO, 'id' | 'title'>
  isNew: boolean
  isWarranty: boolean
  isRepaired: boolean

  qrCode: MaybeNull<string>
  owner: MaybeNull<Pick<CustomerCatalogItemDTO, 'id' | 'title'>>
  macroregion: MaybeNull<Pick<MacroregionCatalogItemDTO, 'id' | 'title'>>
  comment: MaybeNull<string>
  usageCounter: MaybeNull<number>
  currency: MaybeNull<Pick<CurrencyCatalogItemDTO, 'id' | 'title'>>
  price: MaybeNull<number>
  serialNumber: MaybeNull<string>
  inventoryNumber: MaybeNull<string>
}

export type CreatedEquipmentsDTO = CreatedEquipmentDTO[]

export type CreateEquipmentsRequest = {
  location: IdType
  warehouse?: IdType
  title?: string
  nomenclature?: IdType
  condition?: EquipmentConditionEnum
  category?: IdType
  purpose?: IdType
  inventoryNumber?: string
  serialNumber?: string
  quantity?: number
  price?: number
  currency?: IdType
  isNew?: boolean
  isWarranty?: boolean
  isRepaired?: boolean
  usageCounter?: number
  owner?: IdType
  macroregion?: IdType
  comment?: string
  images?: IdType[]
}[]

export type CreateEquipmentsResponse = CreatedEquipmentsDTO

export type CreateEquipmentsBadRequestErrorResponse = Partial<
  FieldsErrors<
    Pick<
      CreateEquipmentsRequest[number],
      | 'category'
      | 'nomenclature'
      | 'inventoryNumber'
      | 'serialNumber'
      | 'condition'
      | 'price'
      | 'currency'
      | 'quantity'
      | 'isNew'
      | 'isWarranty'
      | 'isRepaired'
      | 'usageCounter'
      | 'owner'
      | 'macroregion'
      | 'purpose'
      | 'comment'
    >
  >
>[]
