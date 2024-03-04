import { Moment } from 'moment-timezone'

import { EquipmentNomenclatureListModel } from 'modules/warehouse/models'

import { LocationsModel } from 'shared/models/catalogs/location'
import { IdType } from 'shared/types/common'

export type AmountEquipmentSpentReportFormProps = {
  nomenclatures: EquipmentNomenclatureListModel
  nomenclaturesIsLoading: boolean

  locations: LocationsModel
  locationsIsLoading: boolean

  onSubmit: (values: AmountEquipmentSpentReportFormFields) => void
}

export type AmountEquipmentSpentReportFormFields = {
  nomenclature: IdType
  relocateFrom?: IdType
  relocateTo?: IdType
  period?: [Moment, Moment]
}
