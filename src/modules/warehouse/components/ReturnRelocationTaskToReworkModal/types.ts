import { FormInstance, ModalProps } from 'antd'

export type ReturnRelocationTaskToReworkFormFields = { reason: string }

export type ReturnRelocationTaskToReworkModalProps = Required<
  Pick<ModalProps, 'open' | 'onCancel'>
> & {
  isLoading: boolean
  onSubmit: (
    values: ReturnRelocationTaskToReworkFormFields,
    setFields: FormInstance['setFields'],
  ) => Promise<void>
}
