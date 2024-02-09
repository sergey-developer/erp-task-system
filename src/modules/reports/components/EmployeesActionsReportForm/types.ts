import { Moment } from 'moment-timezone'

import { UsersModel } from 'modules/user/models'

import { IdType } from 'shared/types/common'

export type EmployeesActionsReportFormProps = {
  users: UsersModel
  usersIsLoading: boolean

  onSubmit: (values: EmployeesActionsReportFormFormFields) => void
}

export type EmployeesActionsReportFormFormFields = {
  employee: IdType
  period?: [Moment, Moment]
}
