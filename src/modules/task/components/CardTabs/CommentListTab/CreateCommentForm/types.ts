import { FormInstance } from 'antd'
import { UploadFile } from 'antd/es/upload'

import { FieldsErrors } from 'shared/services/baseApi'

export type CreateCommentFormFields = {
  comment: string
  attachments?: UploadFile[]
}

export type CreateCommentFormErrors = FieldsErrors<CreateCommentFormFields>

export type CreateCommentFormProps = {
  onSubmit: (values: CreateCommentFormFields, form: FormInstance) => Promise<void>
  isLoading: boolean
}
