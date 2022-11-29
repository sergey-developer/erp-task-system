import { generateIdStr } from '_tests_/utils'

import { CreateSubTaskModalProps } from '../interfaces'

export const requiredProps: CreateSubTaskModalProps = {
  recordId: generateIdStr(),
  initialFormValues: {},
  isLoading: false,
  templateOptions: [],
  templateOptionsIsLoading: false,
  onCancel: jest.fn(),
  onSubmit: jest.fn(),
}
