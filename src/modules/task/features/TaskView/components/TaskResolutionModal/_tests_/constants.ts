import { generateIdStr } from '_tests_/utils'
import { TaskTypeEnum } from 'modules/task/constants/common'

import { TaskResolutionModalProps } from '../index'

export const requiredProps: TaskResolutionModalProps = {
  type: TaskTypeEnum.Request,
  recordId: generateIdStr(),
  isLoading: false,
  initialFormValues: {},
  onSubmit: jest.fn(),
  onCancel: jest.fn(),
}
