import { FormInstance, SelectProps, UploadProps } from 'antd'
import { UploadFile } from 'antd/es/upload'
import { EquipmentConditionEnum } from 'features/equipments/api/constants'
import { EquipmentCategoriesDTO, EquipmentCategoryDTO } from 'features/equipments/api/dto'
import { CreateEquipmentsBadRequestResponse } from 'features/equipments/api/schemas'
import {
  NomenclatureDetailDTO,
  NomenclatureDTO,
  NomenclaturesDTO,
} from 'features/nomenclatures/api/dto'
import { WarehousesDTO } from 'features/warehouses/api/dto'

import { BaseModalProps } from 'components/Modals/BaseModal'

import { CurrenciesCatalogDTO } from 'shared/catalogs/currencies/api/dto'
import { CustomersCatalogDTO } from 'shared/catalogs/customers/api/dto'
import { MacroregionsCatalogDTO } from 'shared/catalogs/macroregions/api/dto'
import { WorkTypesCatalogDTO } from 'shared/catalogs/workTypes/api/dto'
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

    categories: EquipmentCategoriesDTO
    categoriesIsLoading: boolean
    category?: EquipmentCategoryDTO
    onChangeCategory: (category: EquipmentCategoryDTO) => void

    warehouses?: WarehousesDTO
    warehousesIsLoading?: boolean

    currencies: CurrenciesCatalogDTO
    currenciesIsLoading: boolean

    owners: CustomersCatalogDTO
    ownersIsLoading: boolean
    onChangeOwner: (id: IdType) => void

    macroregions: MacroregionsCatalogDTO
    macroregionsIsLoading: boolean

    workTypes: WorkTypesCatalogDTO
    workTypesIsLoading: boolean

    nomenclature?: Pick<
      NomenclatureDetailDTO,
      'title' | 'measurementUnit' | 'equipmentHasSerialNumber'
    >
    nomenclatureIsLoading: boolean

    nomenclatures: NomenclaturesDTO
    nomenclaturesIsLoading: boolean
    onChangeNomenclature: NonNullable<SelectProps<IdType, NomenclatureDTO>['onChange']>

    values?: Partial<Pick<EquipmentFormFields, 'title' | 'images'>>
    initialValues?: Partial<EquipmentFormFields>
    errors?: ArrayFirst<CreateEquipmentsBadRequestResponse>
  }
