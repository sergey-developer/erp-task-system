import { generateString } from '_tests_/utils'

import { TaskFirstLineModalProps } from '../interfaces'

export const baseProps: TaskFirstLineModalProps = {
  recordId: generateString(),
  isLoading: false,
  onSubmit: jest.fn(),
  onCancel: jest.fn(),
}
