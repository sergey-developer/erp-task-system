import { FormInstance } from 'antd'

import { BaseModalProps } from 'components/Modals/BaseModal'

export type CreateCallingReasonModalProps = Required<
  Pick<BaseModalProps, 'open' | 'onCancel' | 'confirmLoading'>
> & {
  onSubmit: (
    values: CreateCallingReasonModalFormFields,
    setFields: FormInstance<CreateCallingReasonModalFormFields>['setFields'],
  ) => Promise<void>
}

export type CreateCallingReasonModalFormFields = {
  title: string
  equipmentType: string
  malfunction: string
  inventoryNumber?: string
}
