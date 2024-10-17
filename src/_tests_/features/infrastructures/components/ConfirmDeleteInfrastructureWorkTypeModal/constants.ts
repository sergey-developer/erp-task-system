import { ConfirmDeleteInfrastructureWorkTypeModalProps } from 'modules/infrastructures/components/ConfirmDeleteInfrastructureWorkTypeModal'

export const props: ConfirmDeleteInfrastructureWorkTypeModalProps = {
  open: true,
  confirmLoading: false,
  onOk: jest.fn(),
  onCancel: jest.fn(),
}

export enum TestIdsEnum {
  ConfirmDeleteInfrastructureWorkTypeModal = 'confirm-delete-infrastructure-work-type-modal',
}
