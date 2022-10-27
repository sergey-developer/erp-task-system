import { generateId } from '_tests_/utils'

import { TaskDetailsContainerProps } from '../index'

export const requiredProps: TaskDetailsContainerProps = {
  taskId: generateId(),
  closeTaskDetails: jest.fn(),
  additionalInfoExpanded: false,
  onExpandAdditionalInfo: jest.fn(),
}
