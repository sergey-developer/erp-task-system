import { FormInstance } from 'antd'

import { BaseModalProps } from 'components/Modals/BaseModal'

export type AddOrEditNomenclatureGroupModalFormFields = {
  name: string
}

export type AddOrEditNomenclatureGroupModalProps = Required<
  Pick<BaseModalProps, 'visible' | 'onCancel'>
> & {
  title: string
  okText: string
  onSubmit: (
    values: AddOrEditNomenclatureGroupModalFormFields,
    setFields: FormInstance['setFields'],
  ) => Promise<void>
}
