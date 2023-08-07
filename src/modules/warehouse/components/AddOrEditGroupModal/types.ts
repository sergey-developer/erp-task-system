import { FormInstance } from 'antd'

import { BaseModalProps } from 'components/Modals/BaseModal'

export type GroupModalFormFields = {
  name: string
}

export type AddOrEditGroupModalProps = Required<
  Pick<BaseModalProps, 'visible' | 'onCancel'>
> & {
  title: string
  okText: string
  onSubmit: (
    values: GroupModalFormFields,
    setFields: FormInstance['setFields'],
  ) => Promise<void>
}
