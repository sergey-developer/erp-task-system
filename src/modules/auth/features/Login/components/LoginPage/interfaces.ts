import { LoginMutationArgsModel } from 'modules/auth/models'
import { FieldsErrors } from 'shared/services/api'

export type LoginFormFields = LoginMutationArgsModel

export type LoginFormErrors = FieldsErrors<LoginFormFields>
