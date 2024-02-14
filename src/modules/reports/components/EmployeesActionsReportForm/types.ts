import { Moment } from 'moment-timezone'

import { UsersModel } from 'modules/user/models'

import { IdType } from 'shared/types/common'

export type EmployeesActionsReportFormProps = {
  users: UsersModel
  usersIsLoading: boolean

  onSubmit: (values: EmployeesActionsReportFormFields) => void
}

export type EmployeesActionsReportFormFields = {
  employee: IdType
  period?: [Moment, Moment]
}
