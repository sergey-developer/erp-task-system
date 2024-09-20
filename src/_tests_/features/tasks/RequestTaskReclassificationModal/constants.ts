import { RequestTaskReclassificationModalProps } from 'modules/task/components/RequestTaskReclassificationModal/types'
import { ReclassificationReasonEnum } from 'modules/task/constants/taskReclassificationRequest'

import { fakeIdStr } from '_tests_/utils'

export const reasonValues = Object.values(ReclassificationReasonEnum)

export const props: Readonly<RequestTaskReclassificationModalProps> = {
  open: true,
  recordId: fakeIdStr(),
  isLoading: false,
  onCancel: jest.fn(),
  onSubmit: jest.fn(),
}

export enum TestIdsEnum {
  RequestTaskReclassificationModal = 'request-task-reclassification-modal',
  ReclassificationReason = 'reclassification-reason',
}
