import { FormInstance } from 'antd'

import { FieldsErrors } from 'shared/services/api'

export type AddCommentFormFields = {
  comment: string
}

export type AddCommentFormErrors = FieldsErrors<AddCommentFormFields>

export type AddCommentFormProps = {
  onSubmit: (
    values: AddCommentFormFields,
    setFields: FormInstance['setFields'],
  ) => Promise<void>
  isLoading: boolean
}
