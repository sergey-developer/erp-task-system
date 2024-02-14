import { Moment } from 'moment-timezone'

import { EquipmentNomenclatureListModel } from 'modules/warehouse/models'

import { LocationListModel } from 'shared/models/catalogs/location'
import { IdType } from 'shared/types/common'

export type HistoryNomenclatureOperationsReportFormProps = {
  nomenclatures: EquipmentNomenclatureListModel
  nomenclaturesIsLoading: boolean

  locations: LocationListModel
  locationsIsLoading: boolean

  onSubmit: (values: HistoryNomenclatureOperationsReportFormFields) => void
}

export type HistoryNomenclatureOperationsReportFormFields = {
  nomenclature: IdType
  relocateFrom?: IdType
  relocateTo?: IdType
  period?: [Moment, Moment]
}
