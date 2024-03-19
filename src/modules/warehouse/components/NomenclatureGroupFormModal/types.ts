import { FormInstance } from 'antd'

import { BaseModalProps } from 'components/Modals/BaseModal'

export type NomenclatureGroupFormFields = {
  title: string
}

export type NomenclatureGroupFormModalProps = Required<
  Pick<BaseModalProps, 'open' | 'onCancel' | 'okText' | 'title' | 'isLoading'>
> & {
  onSubmit: (
    values: NomenclatureGroupFormFields,
    setFields: FormInstance<NomenclatureGroupFormFields>['setFields'],
  ) => Promise<void>

  initialValues?: NomenclatureGroupFormFields
}
