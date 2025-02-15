import { EquipmentNomenclaturesDTO } from 'features/warehouses/api/dto'
import { Moment } from 'moment-timezone'

import { LocationsCatalogDTO } from 'shared/catalogs/api/dto/locations'
import { IdType } from 'shared/types/common'

export type AmountEquipmentSpentReportFormProps = {
  nomenclatures: EquipmentNomenclaturesDTO
  nomenclaturesIsLoading: boolean

  locations: LocationsCatalogDTO
  locationsIsLoading: boolean

  onSubmit: (values: AmountEquipmentSpentReportFormFields) => void
}

export type AmountEquipmentSpentReportFormFields = {
  nomenclature: IdType
  relocateFrom?: IdType
  relocateTo?: IdType
  period?: [Moment, Moment]
}
