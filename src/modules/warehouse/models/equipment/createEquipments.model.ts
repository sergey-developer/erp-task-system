import { EquipmentConditionEnum } from 'modules/warehouse/constants/equipment'
import {
  CustomerModel,
  EquipmentCategoryListItemModel,
  EquipmentNomenclatureListItemModel,
  WorkTypeListItemModel,
} from 'modules/warehouse/models'

import { CurrencyListItemModel } from 'shared/models/currency'
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

export type CreateEquipmentsMutationArgs = {
  location: IdType

  title?: string
  nomenclature?: IdType
  warehouse?: IdType
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
  comment?: string
  images?: { id: IdType }[]
}[]

export type CreateEquipmentsSuccessResponse = CreatedEquipmentsModel
