import { ChangePasswordFormFields } from 'features/auth/pages/ChangePasswordPage/types'

import { FieldsErrors } from 'shared/api/baseApi'

export type UpdatePasswordRequest = {
  password: string
}

export type UpdatePasswordResponse = void

export type UpdatePasswordBadRequestErrorResponse = FieldsErrors<
  Pick<ChangePasswordFormFields, 'password'>
>
