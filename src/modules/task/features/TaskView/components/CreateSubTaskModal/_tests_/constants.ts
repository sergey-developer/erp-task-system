import { generateIdStr } from '_tests_/utils'
import { taskFixtures } from 'fixtures/task'

import { CreateSubTaskModalProps } from '../interfaces'

export const requiredProps: CreateSubTaskModalProps = {
  recordId: generateIdStr(),
  initialFormValues: {},
  isLoading: false,
  templateOptions: taskFixtures.getSubTaskTemplateList(2),
  templateOptionsIsLoading: false,
  onCancel: jest.fn(),
  onSubmit: jest.fn(),
}
