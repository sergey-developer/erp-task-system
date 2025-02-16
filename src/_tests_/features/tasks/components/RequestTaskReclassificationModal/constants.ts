import { ReclassificationReasonEnum } from 'features/tasks/api/constants'
import { RequestTaskReclassificationModalProps } from 'features/tasks/components/RequestTaskReclassificationModal/types'

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
