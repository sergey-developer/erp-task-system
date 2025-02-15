import { FormInstance } from 'antd'
import { RelocationEquipmentTechnicalExaminationModel } from 'features/relocationEquipments/api/schemas'
import { DocumentsPackageRelocationEquipmentTableItem } from 'features/relocationEquipments/components/DocumentsPackageRelocationEquipmentTable/types'

import { BaseModalProps } from 'components/Modals/BaseModal'

export type CreateRelocationEquipmentTechnicalExaminationFormFields = {
  malfunction: string
  hasMechanicalDamage: boolean
  restorationAction: string
  restorationCost: number
  conclusion?: string
}

export type CreateRelocationEquipmentTechnicalExaminationModalProps = Required<
  Pick<BaseModalProps, 'open' | 'onCancel' | 'isLoading'>
> & {
  onSubmit: (
    values: CreateRelocationEquipmentTechnicalExaminationFormFields,
    setFields: FormInstance<CreateRelocationEquipmentTechnicalExaminationFormFields>['setFields'],
  ) => Promise<void>

  technicalExamination?: RelocationEquipmentTechnicalExaminationModel
  technicalExaminationIsLoading: boolean

  relocationEquipment?: DocumentsPackageRelocationEquipmentTableItem
}
