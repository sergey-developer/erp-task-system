import { generateWord } from '_tests_/utils'

import { TaskFirstLineModalProps } from '../interfaces'

export const baseProps: TaskFirstLineModalProps = {
  recordId: generateWord(),
  isLoading: false,
  onSubmit: jest.fn(),
  onCancel: jest.fn(),
}
