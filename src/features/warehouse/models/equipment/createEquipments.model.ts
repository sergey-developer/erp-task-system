import { EquipmentConditionEnum } from 'features/warehouse/constants/equipment'
import {
  CustomerModel,
  EquipmentCategoryListItemModel,
  EquipmentNomenclatureListItemModel,
  WorkTypeListItemModel,
} from 'features/warehouse/models'

import { FieldsErrors } from 'shared/api/baseApi'
import { CurrencyListItemModel } from 'shared/catalogs/api/dto/currencies'
import { MacroregionListItemModel } from 'shared/catalogs/api/dto/macroregions'
import { IdType } from 'shared/types/common'
import { MaybeNull } from 'shared/types/utils'

export type CreatedEquipmentListItemModel = {
  id: IdType
  nomenclature: Pick<EquipmentNomenclatureListItemModel, 'id' | 'title'>
  title: string
  condition: EquipmentConditionEnum
  quantity: number
  availableQuantity: number
  category: Pick<EquipmentCategoryListItemModel, 'id' | 'title' | 'code'>
  purpose: Pick<WorkTypeListItemModel, 'id' | 'title'>
  isNew: boolean
  isWarranty: boolean
  isRepaired: boolean

  qrCode: MaybeNull<string>
  owner: MaybeNull<Pick<CustomerModel, 'id' | 'title'>>
  macroregion: MaybeNull<Pick<MacroregionListItemModel, 'id' | 'title'>>
  comment: MaybeNull<string>
  usageCounter: MaybeNull<number>
  currency: MaybeNull<Pick<CurrencyListItemModel, 'id' | 'title'>>
  price: MaybeNull<number>
  serialNumber: MaybeNull<string>
  inventoryNumber: MaybeNull<string>
}

export type CreatedEquipmentsModel = CreatedEquipmentListItemModel[]

export type CreateEquipmentModel = {
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
}

export type CreateEquipmentsMutationArgs = CreateEquipmentModel[]

export type CreateEquipmentsSuccessResponse = CreatedEquipmentsModel

export type CreateEquipmentsBadRequestErrorResponse = Partial<
  FieldsErrors<
    Pick<
      CreateEquipmentModel,
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
