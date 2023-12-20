import { FormInstance, UploadProps } from 'antd'
import { UploadFile } from 'antd/es/upload'

import { EquipmentConditionEnum } from 'modules/warehouse/constants/equipment'
import {
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
import { FileResponse } from 'shared/types/file'

export type EquipmentFormModalFormFields = {
  title: string
  nomenclature: IdType
  condition: EquipmentConditionEnum
  category: IdType
  purpose: IdType

  warehouse?: IdType
  isNew?: boolean
  isWarranty?: boolean
  isRepaired?: boolean
  customerInventoryNumber?: string
  serialNumber?: string
  quantity?: number
  price?: number
  currency?: IdType
  usageCounter?: number
  owner?: IdType
  comment?: string
  images?: UploadFile<FileResponse>[]
}

export type EquipmentFormModalProps = Required<
  Pick<BaseModalProps, 'open' | 'onCancel' | 'okText' | 'title'>
> &
  Pick<BaseModalProps, 'isLoading'> & {
    mode: 'create' | 'edit'

    onSubmit: (
      values: EquipmentFormModalFormFields,
      setFields: FormInstance['setFields'],
    ) => Promise<void> | void

    onUploadImage: NonNullable<UploadProps['customRequest']>
    imageIsUploading: boolean
    onDeleteImage: NonNullable<UploadProps<FileResponse>['onRemove']>
    imageIsDeleting: boolean

    categoryList: EquipmentCategoryListModel
    categoryListIsLoading: boolean
    selectedCategory?: EquipmentCategoryListItemModel
    onChangeCategory: (category: EquipmentCategoryListItemModel) => void

    warehouseList?: WarehouseListModel
    warehouseListIsLoading?: boolean

    currencyList: CurrencyListModel
    currencyListIsLoading: boolean

    ownerList: CustomerListModel
    ownerListIsLoading: boolean

    workTypeList: WorkTypeListModel
    workTypeListIsLoading: boolean

    nomenclature?: Pick<NomenclatureModel, 'title' | 'measurementUnit' | 'equipmentHasSerialNumber'>
    nomenclatureIsLoading: boolean

    nomenclatureList: NomenclatureListModel
    nomenclatureListIsLoading: boolean
    onChangeNomenclature: (id: IdType) => void

    values?: Partial<Pick<EquipmentFormModalFormFields, 'title' | 'images'>>
    initialValues?: Partial<EquipmentFormModalFormFields>
  }
