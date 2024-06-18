import { FormInstance } from 'antd'

import { BaseModalProps } from 'components/Modals/BaseModal'

export type CreateEquipmentTechnicalExaminationFormFields = {
  malfunction: string
  hasMechanicalDamage: boolean
  restorationAction: string
  restorationCost: number
  conclusion?: string
}

export type CreateEquipmentTechnicalExaminationModalProps = Required<
  Pick<BaseModalProps, 'open' | 'onCancel' | 'isLoading'>
> & {
  onSubmit: (
    values: CreateEquipmentTechnicalExaminationFormFields,
    setFields: FormInstance<CreateEquipmentTechnicalExaminationFormFields>['setFields'],
  ) => Promise<void>
}
