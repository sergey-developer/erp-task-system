import { FormInstance, ModalProps } from 'antd'
import { UploadFile } from 'antd/es/upload'

export type ExecuteRelocationTaskFormFields = {
  documents: UploadFile[]
}

export type ExecuteRelocationTaskModalProps = Required<Pick<ModalProps, 'open'>> & {
  isLoading: boolean

  onSubmit: (
    values: ExecuteRelocationTaskFormFields,
    setFields: FormInstance<ExecuteRelocationTaskFormFields>['setFields'],
  ) => Promise<void>
  onCancel: NonNullable<ModalProps['onCancel']>
}
