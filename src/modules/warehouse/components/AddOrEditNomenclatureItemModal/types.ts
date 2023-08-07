import { FormInstance } from 'antd'

import { BaseModalProps } from 'components/Modals/BaseModal'

export type AddOrEditNomenclatureItemModalFormFields = {
  title: string
  shortTitle: string
  group: number
  vendorCode: string
  measurementUnit: number
  country?: number
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
