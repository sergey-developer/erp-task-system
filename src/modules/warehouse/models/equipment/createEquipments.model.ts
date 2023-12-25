import { EquipmentConditionEnum } from 'modules/warehouse/constants/equipment'
import {
  CustomerModel,
  EquipmentCategoryListItemModel,
  EquipmentNomenclatureListItemModel,
  WorkTypeListItemModel,
} from 'modules/warehouse/models'

import { CurrencyListItemModel } from 'shared/models/currency'
import { FieldsErrors } from 'shared/services/baseApi'
import { IdType } from 'shared/types/common'
import { MaybeNull } from 'shared/types/utils'

export type CreatedEquipmentListItemModel = {
  id: IdType
  nomenclature: Pick<EquipmentNomenclatureListItemModel, 'id' | 'title'>
  title: string
  condition: EquipmentConditionEnum
  quantity: number
  category: Pick<EquipmentCategoryListItemModel, 'id' | 'title' | 'code'>
  purpose: Pick<WorkTypeListItemModel, 'id' | 'title'>
  isNew: boolean
  isWarranty: boolean
  isRepaired: boolean

  qrCode: MaybeNull<string>
  owner: MaybeNull<Pick<CustomerModel, 'id' | 'title'>>
  comment: MaybeNull<string>
  usageCounter: MaybeNull<number>
  currency: MaybeNull<Pick<CurrencyListItemModel, 'id' | 'title'>>
  price: MaybeNull<number>
  serialNumber: MaybeNull<string>
  customerInventoryNumber: MaybeNull<string>
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
  customerInventoryNumber?: string
  serialNumber?: string
  quantity?: number
  price?: number
  currency?: IdType
  isNew?: boolean
  isWarranty?: boolean
  isRepaired?: boolean
  usageCounter?: number
  owner?: IdType
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
      | 'customerInventoryNumber'
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
      | 'purpose'
      | 'comment'
    >
  >
>[]
