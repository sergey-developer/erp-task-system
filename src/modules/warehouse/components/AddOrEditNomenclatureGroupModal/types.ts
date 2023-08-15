import { FormInstance } from 'antd'

import { BaseModalProps } from 'components/Modals/BaseModal'

export type AddOrEditNomenclatureGroupModalFormFields = {
  title: string
}

export type AddOrEditNomenclatureGroupModalProps = Required<
  Pick<BaseModalProps, 'visible' | 'onCancel'>
> & {
  title: string
  okText: string
  isLoading: boolean
  onSubmit: (
    values: AddOrEditNomenclatureGroupModalFormFields,
    setFields: FormInstance['setFields'],
  ) => Promise<void>
}
