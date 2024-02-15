import { Moment } from 'moment-timezone'

import { EquipmentNomenclatureListModel } from 'modules/warehouse/models'

import { IdType } from 'shared/types/common'

export type HistoryNomenclatureOperationsReportFormProps = {
  nomenclatures: EquipmentNomenclatureListModel
  nomenclaturesIsLoading: boolean

  onSubmit: (values: HistoryNomenclatureOperationsReportFormFields) => void
}

export type HistoryNomenclatureOperationsReportFormFields = {
  nomenclature: IdType
  period?: [Moment, Moment]
}
