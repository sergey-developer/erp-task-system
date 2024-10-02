import { ConfirmCancelReclassificationRequestModalProps } from 'modules/task/components/ConfirmCancelReclassificationRequestModal/index'

export const props: ConfirmCancelReclassificationRequestModalProps = {
  open: true,
  confirmLoading: false,
  onOk: jest.fn(),
  onCancel: jest.fn(),
}

export enum TestIdsEnum {
  ConfirmCancelReclassificationRequestModal = 'confirm-cancel-reclassification-request-modal',
}
