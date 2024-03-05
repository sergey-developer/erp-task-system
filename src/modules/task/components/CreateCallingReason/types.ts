import { FormInstance } from 'antd'

import { BaseModalProps } from 'components/Modals/BaseModal'

export type CreateCallingReasonProps = Required<
  Pick<BaseModalProps, 'open' | 'onCancel' | 'confirmLoading'>
> & {
  onSubmit: (
    values: CreateCallingReasonFormFields,
    setFields: FormInstance<CreateCallingReasonFormFields>['setFields'],
  ) => Promise<void>
}

export type CreateCallingReasonFormFields = {
  title: string
  equipmentType: string
  malfunction: string
  inventoryNumber?: string
}
