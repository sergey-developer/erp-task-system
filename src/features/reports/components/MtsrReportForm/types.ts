import { Moment } from 'moment-timezone'

import { CustomersCatalogDTO } from 'shared/catalogs/customers/api/dto'
import { IdType } from 'shared/types/common'

export type MtsrReportFormFields = {
  period: [Moment, Moment]
  customers?: IdType[]
}

export type MtsrReportFormProps = {
  initialValues: Partial<MtsrReportFormFields>

  customers: CustomersCatalogDTO
  customersIsLoading: boolean

  onSubmit: (values: MtsrReportFormFields) => void
}
