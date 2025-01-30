import { Moment } from 'moment-timezone'

import { EquipmentNomenclaturesModel } from 'features/warehouse/models'

import { IdType } from 'shared/types/common'

export type HistoryNomenclatureOperationsReportFormProps = {
  nomenclatures: EquipmentNomenclaturesModel
  nomenclaturesIsLoading: boolean

  onSubmit: (values: HistoryNomenclatureOperationsReportFormFields) => void
}

export type HistoryNomenclatureOperationsReportFormFields = {
  nomenclature: IdType
  period?: [Moment, Moment]
}
