import { Moment } from 'moment-timezone'

import { CustomerListModel } from 'features/warehouse/models'

import { IdType } from 'shared/types/common'

export type MtsrReportFormFields = {
  period: [Moment, Moment]
  customers?: IdType[]
}

export type MtsrReportFormProps = {
  initialValues: Partial<MtsrReportFormFields>

  customers: CustomerListModel
  customersIsLoading: boolean

  onSubmit: (values: MtsrReportFormFields) => void
}
