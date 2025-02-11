import { UsersDTO } from 'features/users/api/dto'
import { Moment } from 'moment-timezone'

import { IdType } from 'shared/types/common'

export type EmployeesActionsReportFormProps = {
  users: UsersDTO
  usersIsLoading: boolean

  onSubmit: (values: EmployeesActionsReportFormFields) => void
}

export type EmployeesActionsReportFormFields = {
  employee: IdType
  period?: [Moment, Moment]
}
