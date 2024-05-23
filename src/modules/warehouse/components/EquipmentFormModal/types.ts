import { FormInstance, UploadProps } from 'antd'
import { UploadFile } from 'antd/es/upload'

import { EquipmentConditionEnum } from 'modules/warehouse/constants/equipment'
import {
  CreateEquipmentsBadRequestErrorResponse,
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
import { ArrayFirst } from 'shared/types/utils'

export type EquipmentFormFields = {
  title: string
  nomenclature: IdType
  condition: EquipmentConditionEnum
  category: IdType
  purpose: IdType

  warehouse?: IdType
  isNew?: boolean
  isWarranty?: boolean
  isRepaired?: boolean
  inventoryNumber?: string
  serialNumber?: string
  quantity?: number
  price?: number
  currency?: IdType
  usageCounter?: number
  owner?: IdType
  ownerIsObermeister?: boolean
  comment?: string
  images?: UploadFile<FileResponse>[]
}

export type EquipmentFormModalProps = Required<
  Pick<BaseModalProps, 'open' | 'onCancel' | 'okText' | 'title'>
> &
  Pick<BaseModalProps, 'isLoading'> & {
    mode: 'create' | 'edit'

    onSubmit: (
      values: EquipmentFormFields,
      setFields: FormInstance<EquipmentFormFields>['setFields'],
    ) => Promise<void> | void

    onUploadImage: NonNullable<UploadProps['customRequest']>
    imageIsUploading: boolean
    onDeleteImage: NonNullable<UploadProps<FileResponse>['onRemove']>
    imageIsDeleting: boolean

    categories: EquipmentCategoryListModel
    categoriesIsLoading: boolean
    category?: EquipmentCategoryListItemModel
    onChangeCategory: (category: EquipmentCategoryListItemModel) => void

    warehouses?: WarehouseListModel
    warehousesIsLoading?: boolean

    currencies: CurrencyListModel
    currenciesIsLoading: boolean

    owners: CustomerListModel
    ownersIsLoading: boolean

    workTypes: WorkTypeListModel
    workTypesIsLoading: boolean

    nomenclature?: Pick<NomenclatureModel, 'title' | 'measurementUnit' | 'equipmentHasSerialNumber'>
    nomenclatureIsLoading: boolean

    nomenclatures: NomenclatureListModel
    nomenclaturesIsLoading: boolean
    onChangeNomenclature: (id: IdType) => void

    values?: Partial<Pick<EquipmentFormFields, 'title' | 'images'>>
    initialValues?: Partial<EquipmentFormFields>
    errors?: ArrayFirst<CreateEquipmentsBadRequestErrorResponse>
  }
