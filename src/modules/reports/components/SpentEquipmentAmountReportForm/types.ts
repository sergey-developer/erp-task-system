import { Moment } from 'moment-timezone'

import { EquipmentNomenclatureListModel } from 'modules/warehouse/models'

import { LocationListModel } from 'shared/models/catalogs/location'
import { IdType } from 'shared/types/common'

export type SpentEquipmentAmountReportFormProps = {
  nomenclatures: EquipmentNomenclatureListModel
  nomenclaturesIsLoading: boolean

  locations: LocationListModel
  locationsIsLoading: boolean

  onSubmit: (values: SpentEquipmentAmountReportFormFields) => void
}

export type SpentEquipmentAmountReportFormFields = {
  nomenclature: IdType
  relocateFrom?: IdType
  relocateTo?: IdType
  period?: [Moment, Moment]
}
