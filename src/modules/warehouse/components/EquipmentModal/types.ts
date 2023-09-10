import { FormInstance } from 'antd'

import { CurrencyListModel } from 'modules/currency/models'
import { EquipmentConditionEnum } from 'modules/warehouse/constants'
import {
  CustomerListModel,
  EquipmentCategoryListModel,
  NomenclatureListModel,
  NomenclatureModel,
  WarehouseListModel,
  WorkTypeListModel,
} from 'modules/warehouse/models'

import { BaseModalProps } from 'components/Modals/BaseModal'

import { IdType } from 'shared/types/common'

export type EquipmentModalFormFields = {
  title: string
  nomenclature: IdType
  warehouse: IdType
  condition: EquipmentConditionEnum
  category: IdType
  isNew: boolean
  isWarranty: boolean
  isRepaired: boolean
  isResponsibleStorage: boolean
  purpose: IdType

  customerInventoryNumber?: string
  serialNumber?: string
  quantity?: number
  price?: number
  currency?: IdType
  usageCounter?: number
  owner?: IdType
  comment?: string
}

export type EquipmentModalProps = Required<
  Pick<BaseModalProps, 'visible' | 'onCancel' | 'okText' | 'title' | 'isLoading'>
> & {
  onSubmit: (
    values: EquipmentModalFormFields,
    setFields: FormInstance['setFields'],
  ) => Promise<void>

  categoryList: EquipmentCategoryListModel
  categoryListIsLoading: boolean

  warehouseList: WarehouseListModel
  warehouseListIsLoading: boolean

  currencyList: CurrencyListModel
  currencyListIsFetching: boolean

  ownerList: CustomerListModel
  ownerListIsFetching: boolean

  workTypeList: WorkTypeListModel
  workTypeListIsFetching: boolean

  nomenclature?: Pick<NomenclatureModel, 'title' | 'measurementUnit' | 'equipmentHasSerialNumber'>
  nomenclatureList: NomenclatureListModel
  nomenclatureListIsLoading: boolean
  onChangeNomenclature: (id: IdType) => void

  initialValues?: Partial<EquipmentModalFormFields>
}
