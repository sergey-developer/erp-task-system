import { FormInstance } from 'antd'

import { BaseModalProps } from 'components/Modals/BaseModal'

export type NomenclatureGroupFormModalFormFields = {
  title: string
}

export type NomenclatureGroupFormModalProps = Required<
  Pick<BaseModalProps, 'open' | 'onCancel' | 'okText' | 'title' | 'isLoading'>
> & {
  onSubmit: (
    values: NomenclatureGroupFormModalFormFields,
    setFields: FormInstance<NomenclatureGroupFormModalFormFields>['setFields'],
  ) => Promise<void>

  initialValues?: NomenclatureGroupFormModalFormFields
}
