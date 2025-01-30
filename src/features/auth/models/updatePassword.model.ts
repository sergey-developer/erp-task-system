import { ChangePasswordFormFields } from 'features/auth/pages/ChangePasswordPage/types'

import { FieldsErrors } from 'shared/api/services/baseApi'

export type UpdatePasswordMutationArgs = {
  password: string
}

export type UpdatePasswordSuccessResponse = void

export type UpdatePasswordBadRequestErrorResponse = FieldsErrors<
  Pick<ChangePasswordFormFields, 'password'>
>
