import { FormInstance, SelectProps, UploadProps } from 'antd'
import { UploadFile } from 'antd/es/upload'
import { EquipmentConditionEnum } from 'features/warehouse/constants/equipment'
import {
  CreateEquipmentsBadRequestErrorResponse,
  CustomersModel,
  EquipmentCategoriesModel,
  EquipmentCategoryListItemModel,
  NomenclatureListItemModel,
  NomenclatureModel,
  NomenclaturesModel,
  WarehousesModel,
  WorkTypesCatalogDTO,
} from 'features/warehouse/models'

import { BaseModalProps } from 'components/Modals/BaseModal'

import { CurrenciesCatalogDTO } from 'shared/catalogs/api/dto/currencies'
import { MacroregionsCatalogDTO } from 'shared/catalogs/api/dto/macroregions'
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
      form: FormInstance<EquipmentFormFields>,
    ) => Promise<void> | void

    onUploadImage: NonNullable<UploadProps['customRequest']>
    imageIsUploading: boolean
    onDeleteImage: NonNullable<UploadProps<FileResponse>['onRemove']>
    imageIsDeleting: boolean

    categories: EquipmentCategoriesModel
    categoriesIsLoading: boolean
    category?: EquipmentCategoryListItemModel
    onChangeCategory: (category: EquipmentCategoryListItemModel) => void

    warehouses?: WarehousesModel
    warehousesIsLoading?: boolean

    currencies: CurrenciesCatalogDTO
    currenciesIsLoading: boolean

    owners: CustomersModel
    ownersIsLoading: boolean
    onChangeOwner: (id: IdType) => void

    macroregions: MacroregionsCatalogDTO
    macroregionsIsLoading: boolean

    workTypes: WorkTypesCatalogDTO
    workTypesIsLoading: boolean

    nomenclature?: Pick<NomenclatureModel, 'title' | 'measurementUnit' | 'equipmentHasSerialNumber'>
    nomenclatureIsLoading: boolean

    nomenclatures: NomenclaturesModel
    nomenclaturesIsLoading: boolean
    onChangeNomenclature: NonNullable<SelectProps<IdType, NomenclatureListItemModel>['onChange']>

    values?: Partial<Pick<EquipmentFormFields, 'title' | 'images'>>
    initialValues?: Partial<EquipmentFormFields>
    errors?: ArrayFirst<CreateEquipmentsBadRequestErrorResponse>
  }
