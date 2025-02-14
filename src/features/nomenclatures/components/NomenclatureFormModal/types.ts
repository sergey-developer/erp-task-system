import { FormInstance } from 'antd'
import {
  MeasurementUnitsCatalogDTO,
  NomenclaturesGroupsDTO,
  NomenclatureModel,
} from 'features/warehouse/models'

import { BaseModalProps } from 'components/Modals/BaseModal'

import { CountriesCatalogDTO } from 'shared/catalogs/api/dto/countries'
import { MaybeNull } from 'shared/types/utils'

export type NomenclatureFormFields = {
  title: string
  shortTitle: string
  group: number
  vendorCode: string
  measurementUnit: number
  equipmentHasSerialNumber?: boolean
  country?: MaybeNull<number>
}

export type NomenclatureFormModalProps = Required<Pick<BaseModalProps, 'open' | 'onCancel'>> & {
  title: string
  okText: string
  isLoading: boolean
  submitBtnDisabled?: boolean

  nomenclature?: NomenclatureModel
  nomenclatureIsLoading?: boolean

  groups: NomenclatureGroupsModel
  groupsIsLoading: boolean

  countries: CountriesCatalogDTO
  countriesIsLoading: boolean

  measurementUnits: MeasurementUnitsCatalogDTO
  measurementUnitsIsLoading: boolean

  onSubmit: (
    values: NomenclatureFormFields,
    setFields: FormInstance<NomenclatureFormFields>['setFields'],
  ) => Promise<void>
}
