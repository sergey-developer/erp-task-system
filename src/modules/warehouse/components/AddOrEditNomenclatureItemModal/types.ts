import { FormInstance } from 'antd'

import { BaseModalProps } from 'components/Modals/BaseModal'

export type AddOrEditNomenclatureItemModalFormFields = {
  name: string
}

export type AddOrEditNomenclatureItemModalProps = Required<
  Pick<BaseModalProps, 'visible' | 'onCancel'>
> & {
  title: string
  okText: string
  onSubmit: (
    values: AddOrEditNomenclatureItemModalFormFields,
    setFields: FormInstance['setFields'],
  ) => Promise<void>
}
