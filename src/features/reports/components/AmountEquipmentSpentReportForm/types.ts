import { Moment } from 'moment-timezone'

import { EquipmentNomenclaturesModel } from 'features/warehouse/models'

import { LocationsCatalogModel } from 'shared/catalogs/models/locations'
import { IdType } from 'shared/types/common'

export type AmountEquipmentSpentReportFormProps = {
  nomenclatures: EquipmentNomenclaturesModel
  nomenclaturesIsLoading: boolean

  locations: LocationsCatalogModel
  locationsIsLoading: boolean

  onSubmit: (values: AmountEquipmentSpentReportFormFields) => void
}

export type AmountEquipmentSpentReportFormFields = {
  nomenclature: IdType
  relocateFrom?: IdType
  relocateTo?: IdType
  period?: [Moment, Moment]
}
