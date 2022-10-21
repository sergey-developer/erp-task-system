import { FormInstance } from 'antd'

import { FieldsErrors } from 'shared/services/api'

export type CreateCommentFormFields = {
  comment: string
}

export type CreateCommentFormErrors = FieldsErrors<CreateCommentFormFields>

export type CreateCommentFormProps = {
  onSubmit: (
    values: CreateCommentFormFields,
    setFields: FormInstance,
  ) => Promise<void>
  isLoading: boolean
}
