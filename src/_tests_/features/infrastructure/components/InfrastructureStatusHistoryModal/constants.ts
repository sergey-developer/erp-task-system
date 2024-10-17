import { InfrastructureStatusHistoryModalProps } from 'modules/infrastructures/components/InfrastructureStatusHistoryModal'

export const props: Readonly<InfrastructureStatusHistoryModalProps> = {
  isLoading: false,
  data: [],
  open: true,
  onOk: jest.fn(),
  onCancel: jest.fn(),
}

export enum TestIdsEnum {
  Container = 'infrastructure-status-history-modal',
}
