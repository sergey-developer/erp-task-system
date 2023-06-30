import { ChangePasswordFormFields } from 'modules/auth/pages/ChangePasswordPage/interfaces'

import { FieldsErrors } from 'shared/services/api'

export type UpdatePasswordMutationArgs = {
  password: string
}

export type UpdatePasswordSuccessResponse = void

export type UpdatePasswordBadRequestErrorResponse = FieldsErrors<
  Pick<ChangePasswordFormFields, 'password'>
>
