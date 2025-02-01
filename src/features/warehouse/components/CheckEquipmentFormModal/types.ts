import { FormInstance, SelectProps } from 'antd'
import { EquipmentConditionEnum } from 'features/warehouse/constants/equipment'
import {
  CustomerListModel,
  EquipmentCategoriesModel,
  EquipmentCategoryListItemModel,
  NomenclatureListItemModel,
  NomenclatureListModel,
  NomenclatureModel,
  WorkTypesModel,
} from 'features/warehouse/models'

import { BaseModalProps } from 'components/Modals/BaseModal'

import { CurrenciesCatalogDTO } from 'shared/catalogs/api/dto/currencies'
import { LocationsCatalogDTO } from 'shared/catalogs/api/dto/locations'
import { MacroregionsCatalogDTO } from 'shared/catalogs/api/dto/macroregions'
import { IdType } from 'shared/types/common'

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
}

export type CheckEquipmentFormModalProps = Required<
  Pick<BaseModalProps, 'open' | 'onCancel' | 'title'>
> &
  Pick<BaseModalProps, 'isLoading'> & {
    isCredited: boolean

    onSubmit: (
      values: CheckEquipmentFormFields,
      form: FormInstance<CheckEquipmentFormFields>,
    ) => Promise<void> | void

    categories: EquipmentCategoriesModel
    categoriesIsLoading: boolean
    category?: EquipmentCategoryListItemModel
    onChangeCategory: (category: EquipmentCategoryListItemModel) => void

    locations: LocationsCatalogDTO
    locationsIsLoading: boolean

    currencies: CurrenciesCatalogDTO
    currenciesIsLoading: boolean

    owners: CustomerListModel
    ownersIsLoading: boolean
    onChangeOwner: (id: IdType) => void

    macroregions: MacroregionsCatalogDTO
    macroregionsIsLoading: boolean

    workTypes: WorkTypesModel
    workTypesIsLoading: boolean

    nomenclature?: Pick<NomenclatureModel, 'title' | 'measurementUnit' | 'equipmentHasSerialNumber'>
    nomenclatureIsLoading: boolean

    nomenclatures: NomenclatureListModel
    nomenclaturesIsLoading: boolean
    onChangeNomenclature: NonNullable<SelectProps<IdType, NomenclatureListItemModel>['onChange']>

    values?: Partial<Pick<CheckEquipmentFormFields, 'title'>>
    initialValues?: Partial<CheckEquipmentFormFields>
  }
