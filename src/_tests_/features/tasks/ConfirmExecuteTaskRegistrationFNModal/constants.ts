import {
  ConfirmExecuteTaskRegistrationFNModalProps,
} from 'modules/task/components/ConfirmExecuteTaskRegistrationFNModal'

export const props: Readonly<ConfirmExecuteTaskRegistrationFNModalProps> = {
  open: true,
  onCancel: jest.fn(),
  onOk: jest.fn(),
}

export enum TestIdsEnum {
  ConfirmExecuteTaskRegistrationFNModal = 'confirm-execute-task-registration-fn-modal',
}