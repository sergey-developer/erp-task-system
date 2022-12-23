import { generateId } from '_tests_/utils'

import { TaskCardContainerProps } from '../index'

export const requiredProps: TaskCardContainerProps = {
  taskId: generateId(),
  closeTaskCard: jest.fn(),
  additionalInfoExpanded: false,
  onExpandAdditionalInfo: jest.fn(),
}
