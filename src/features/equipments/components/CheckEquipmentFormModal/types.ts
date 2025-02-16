import { FormInstance, SelectProps } from 'antd'
import { EquipmentConditionEnum } from 'features/equipments/api/constants'
import { EquipmentCategoriesDTO, EquipmentCategoryDTO } from 'features/equipments/api/dto'
import {
  NomenclatureDetailDTO,
  NomenclatureDTO,
  NomenclaturesDTO,
} from 'features/nomenclatures/api/dto'

import { BaseModalProps } from 'components/Modals/BaseModal'

import { CurrenciesCatalogDTO } from 'shared/catalogs/currencies/api/dto'
import { CustomersCatalogDTO } from 'shared/catalogs/customers/api/dto'
import { LocationsCatalogDTO } from 'shared/catalogs/locations/api/dto'
import { MacroregionsCatalogDTO } from 'shared/catalogs/macroregions/api/dto'
import { WorkTypesCatalogDTO } from 'shared/catalogs/workTypes/api/dto'
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

    categories: EquipmentCategoriesDTO
    categoriesIsLoading: boolean
    category?: EquipmentCategoryDTO
    onChangeCategory: (category: EquipmentCategoryDTO) => void

    locations: LocationsCatalogDTO
    locationsIsLoading: boolean

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

    values?: Partial<Pick<CheckEquipmentFormFields, 'title'>>
    initialValues?: Partial<CheckEquipmentFormFields>
  }
