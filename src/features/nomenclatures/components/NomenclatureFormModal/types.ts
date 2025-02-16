import { FormInstance } from 'antd'
import { NomenclatureDetailDTO, NomenclaturesGroupsDTO } from 'features/nomenclatures/api/dto'

import { BaseModalProps } from 'components/Modals/BaseModal'

import { CountriesCatalogDTO } from 'shared/catalogs/countries/api/dto'
import { MeasurementUnitsCatalogDTO } from 'shared/catalogs/measurementUnits/api/dto'
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

  nomenclature?: NomenclatureDetailDTO
  nomenclatureIsLoading?: boolean

  groups: NomenclaturesGroupsDTO
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
