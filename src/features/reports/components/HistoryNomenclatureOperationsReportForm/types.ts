import { EquipmentNomenclaturesDTO } from 'features/warehouse/models'
import { Moment } from 'moment-timezone'

import { IdType } from 'shared/types/common'

export type HistoryNomenclatureOperationsReportFormProps = {
  nomenclatures: EquipmentNomenclaturesDTO
  nomenclaturesIsLoading: boolean

  onSubmit: (values: HistoryNomenclatureOperationsReportFormFields) => void
}

export type HistoryNomenclatureOperationsReportFormFields = {
  nomenclature: IdType
  period?: [Moment, Moment]
}
