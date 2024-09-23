import { FormInstance, UploadProps } from 'antd'
import { UploadFile } from 'antd/es/upload'

import { EquipmentConditionEnum } from 'modules/warehouse/constants/equipment'
import {
  CreateEquipmentsBadRequestErrorResponse,
  CustomerListModel,
  EquipmentCategoriesModel,
  EquipmentCategoryListItemModel,
  NomenclatureListModel,
  NomenclatureModel,
  WarehouseListModel,
  WorkTypesModel,
} from 'modules/warehouse/models'

import { BaseModalProps } from 'components/Modals/BaseModal'

import { CurrenciesModel } from 'shared/models/currency'
import { MacroregionsModel } from 'shared/models/macroregion'
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
  macroregion?: IdType
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

    categories: EquipmentCategoriesModel
    categoriesIsLoading: boolean
    category?: EquipmentCategoryListItemModel
    onChangeCategory: (category: EquipmentCategoryListItemModel) => void

    warehouses?: WarehouseListModel
    warehousesIsLoading?: boolean

    currencies: CurrenciesModel
    currenciesIsLoading: boolean

    owners: CustomerListModel
    ownersIsLoading: boolean
    onChangeOwner: (id: IdType) => void

    macroregions: MacroregionsModel
    macroregionsIsLoading: boolean

    workTypes: WorkTypesModel
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
