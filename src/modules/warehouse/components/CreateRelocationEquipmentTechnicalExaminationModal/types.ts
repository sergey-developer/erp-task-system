import { FormInstance } from 'antd'

import { DocumentsPackageRelocationEquipmentTableItem } from 'modules/warehouse/components/DocumentsPackageRelocationEquipmentTable/types'
import { RelocationEquipmentTechnicalExaminationModel } from 'modules/warehouse/models/relocationEquipment'

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
