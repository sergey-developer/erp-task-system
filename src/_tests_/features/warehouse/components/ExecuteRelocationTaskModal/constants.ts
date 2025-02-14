import { ExecuteRelocationTaskModalProps } from 'features/relocationTasks/components/ExecuteRelocationTaskModal/types'

export const props: Readonly<ExecuteRelocationTaskModalProps> = {
  open: true,
  isLoading: false,
  onSubmit: jest.fn(),
  onCancel: jest.fn(),
}

export enum TestIdsEnum {
  ExecuteRelocationTaskModal = 'execute-relocation-task-modal',
  DocumentsFormItem = 'documents-form-item',
}
