import { FormInstance, ModalProps } from 'antd'

import { UploadFile } from 'shared/types/file'

export type ExecuteRelocationTaskModalFormFields = {
  documents: UploadFile[]
}

export type ExecuteRelocationTaskModalProps = {
  isLoading: boolean

  onSubmit: (
    values: ExecuteRelocationTaskModalFormFields,
    setFields: FormInstance['setFields'],
  ) => Promise<void>
  onCancel: NonNullable<ModalProps['onCancel']>
}
