import { FormInstance } from 'antd'

import { BaseModalProps } from 'components/Modals/BaseModal'

export type CreateTechnicalExaminationFormFields = {
  malfunction: string
  hasMechanicalDamage: boolean
  restorationAction: string
  restorationCost: number
  conclusion?: string
}

export type CreateTechnicalExaminationModalProps = Required<
  Pick<BaseModalProps, 'open' | 'onCancel' | 'isLoading'>
> & {
  onSubmit: (
    values: CreateTechnicalExaminationFormFields,
    setFields: FormInstance<CreateTechnicalExaminationFormFields>['setFields'],
  ) => Promise<void>
}
