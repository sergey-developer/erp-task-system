import { CreateEquipmentTechnicalExaminationModalProps } from 'features/equipments/components/CreateEquipmentTechnicalExaminationModal/types'

export const props: CreateEquipmentTechnicalExaminationModalProps = {
  open: true,
  isLoading: false,
  onCancel: jest.fn(),
  onSubmit: jest.fn(),
}

export enum TestIdsEnum {
  CreateEquipmentTechnicalExaminationModal = 'create-equipment-technical-examination-modal',
  MalfunctionFormItem = 'malfunction-form-item',
  ConclusionFormItem = 'conclusion-form-item',
  RestorationActionFormItem = 'restoration-action-form-item',
  RestorationCostFormItem = 'restoration-cost-form-item',
}
