import { FormInstance } from 'antd'

import {
  CreateEquipmentMutationArgs,
  CustomerListModel,
  EquipmentCategoryListItemModel,
  EquipmentCategoryListModel,
  NomenclatureListModel,
  NomenclatureModel,
  WarehouseListModel,
  WorkTypeListModel,
} from 'modules/warehouse/models'

import { BaseModalProps } from 'components/Modals/BaseModal'

import { CurrencyListModel } from 'shared/models/currency'
import { IdType } from 'shared/types/common'

export type EquipmentModalFormFields = CreateEquipmentMutationArgs

export type EquipmentModalProps = Required<
  Pick<BaseModalProps, 'visible' | 'onCancel' | 'okText' | 'title' | 'isLoading'>
> & {
  onSubmit: (
    values: EquipmentModalFormFields,
    setFields: FormInstance['setFields'],
  ) => Promise<void>

  categoryList: EquipmentCategoryListModel
  categoryListIsLoading: boolean
  selectedCategory?: EquipmentCategoryListItemModel
  onChangeCategory: (category: EquipmentCategoryListItemModel) => void

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
