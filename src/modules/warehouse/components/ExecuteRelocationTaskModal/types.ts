import { FormInstance, ModalProps } from 'antd'
import { UploadFile } from 'antd/es/upload/interface'

export type ExecuteRelocationTaskModalFormFields = {
  documents: UploadFile[]
}

export type ExecuteRelocationTaskModalProps = Required<Pick<ModalProps, 'open'>> & {
  isLoading: boolean

  onSubmit: (
    values: ExecuteRelocationTaskModalFormFields,
    setFields: FormInstance['setFields'],
  ) => Promise<void>
  onCancel: NonNullable<ModalProps['onCancel']>
}
