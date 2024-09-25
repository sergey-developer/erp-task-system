import { FormInstance, SelectProps, UploadProps } from 'antd'
import { UploadFile } from 'antd/es/upload'

import { EquipmentConditionEnum } from 'modules/warehouse/constants/equipment'
import {
  CustomerListModel,
  EquipmentCategoriesModel,
  EquipmentCategoryListItemModel,
  NomenclatureListItemModel,
  NomenclatureListModel,
  NomenclatureModel,
  WorkTypesModel,
} from 'modules/warehouse/models'

import { BaseModalProps } from 'components/Modals/BaseModal'

import { LocationsCatalogModel } from 'shared/models/catalogs/locations'
import { CurrenciesModel } from 'shared/models/currency'
import { MacroregionsModel } from 'shared/models/macroregion'
import { IdType } from 'shared/types/common'
import { FileResponse } from 'shared/types/file'

export type CheckEquipmentFormFields = {
  title: string
  nomenclature: IdType
  condition: EquipmentConditionEnum
  category: IdType
  purpose: IdType

  location?: IdType
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
  macroregion?: IdType
  comment?: string
  images?: UploadFile<FileResponse>[]
}

export type CheckEquipmentFormModalProps = Required<
  Pick<BaseModalProps, 'open' | 'onCancel' | 'okText' | 'title'>
> &
  Pick<BaseModalProps, 'isLoading'> & {
    isCredited: boolean

    onSubmit: (
      values: CheckEquipmentFormFields,
      form: FormInstance<CheckEquipmentFormFields>,
    ) => Promise<void> | void

    onUploadImage: NonNullable<UploadProps['customRequest']>
    imageIsUploading: boolean
    onDeleteImage: NonNullable<UploadProps<FileResponse>['onRemove']>
    imageIsDeleting: boolean

    categories: EquipmentCategoriesModel
    categoriesIsLoading: boolean
    category?: EquipmentCategoryListItemModel
    onChangeCategory: (category: EquipmentCategoryListItemModel) => void

    locations: LocationsCatalogModel
    locationsIsLoading: boolean

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
    onChangeNomenclature: NonNullable<SelectProps<IdType, NomenclatureListItemModel>['onChange']>

    values?: Partial<Pick<CheckEquipmentFormFields, 'title' | 'images'>>
    initialValues?: Partial<CheckEquipmentFormFields>
  }
