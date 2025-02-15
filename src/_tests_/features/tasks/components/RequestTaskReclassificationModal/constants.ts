import { RequestTaskReclassificationModalProps } from 'features/tasks/components/RequestTaskReclassificationModal/types'
import { ReclassificationReasonEnum } from 'features/tasks/constants/taskReclassificationRequest/index'

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
