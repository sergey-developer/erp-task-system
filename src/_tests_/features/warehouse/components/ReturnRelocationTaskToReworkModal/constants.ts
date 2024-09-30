import { ReturnRelocationTaskToReworkModalProps } from 'modules/warehouse/components/ReturnRelocationTaskToReworkModal/types'

export const props: Readonly<ReturnRelocationTaskToReworkModalProps> = {
  open: true,
  isLoading: false,
  onSubmit: jest.fn(),
  onCancel: jest.fn(),
}

export enum TestIdsEnum {
  ReturnRelocationTaskReworkModal = 'return-relocation-task-rework-modal',
  ReasonFormItem = 'reason-form-item',
}
