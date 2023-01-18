import { generateIdStr } from '_tests_/utils'
import { ReclassificationReasonEnum } from 'modules/task/constants/common'

import { RequestTaskReclassificationModalProps } from '../index'

export const requiredProps: RequestTaskReclassificationModalProps = {
  recordId: generateIdStr(),
  isLoading: false,
  onCancel: jest.fn(),
  onSubmit: jest.fn(),
}

export const notAvailableReasons = [ReclassificationReasonEnum.DivideTask]

export const availableReasons = Object.values(
  ReclassificationReasonEnum,
).filter((reason) => !notAvailableReasons.includes(reason))
