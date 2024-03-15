import { FormInstance } from 'antd'

import { DocumentsPackageRelocationEquipmentTableItem } from 'modules/warehouse/components/DocumentsPackageRelocationEquipmentTable/types'
import { RelocationEquipmentTechnicalExaminationModel } from 'modules/warehouse/models/relocationEquipment'

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

  technicalExamination?: RelocationEquipmentTechnicalExaminationModel
  technicalExaminationIsLoading: boolean

  relocationEquipment?: DocumentsPackageRelocationEquipmentTableItem
}
