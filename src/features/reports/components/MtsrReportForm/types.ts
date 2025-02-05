import { CustomersModel } from 'features/warehouse/models'
import { Moment } from 'moment-timezone'

import { IdType } from 'shared/types/common'

export type MtsrReportFormFields = {
  period: [Moment, Moment]
  customers?: IdType[]
}

export type MtsrReportFormProps = {
  initialValues: Partial<MtsrReportFormFields>

  customers: CustomersModel
  customersIsLoading: boolean

  onSubmit: (values: MtsrReportFormFields) => void
}
