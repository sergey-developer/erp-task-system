import { FormInstance } from 'antd'
import { RelocationEquipmentTechnicalExaminationDTO } from 'features/relocationEquipments/api/dto'
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

  technicalExamination?: RelocationEquipmentTechnicalExaminationDTO
  technicalExaminationIsLoading: boolean

  relocationEquipment?: DocumentsPackageRelocationEquipmentTableItem
}
