import { FormInstance } from 'antd'

import { BaseModalProps } from 'components/Modals/BaseModal'

export type AddOrEditNomenclatureGroupModalFormFields = {
  title: string
}

export type AddOrEditNomenclatureGroupModalProps = Required<
  Pick<BaseModalProps, 'open' | 'onCancel' | 'okText' | 'title' | 'isLoading'>
> & {
  onSubmit: (
    values: AddOrEditNomenclatureGroupModalFormFields,
    setFields: FormInstance['setFields'],
  ) => Promise<void>

  initialValues?: AddOrEditNomenclatureGroupModalFormFields
}
