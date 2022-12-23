import { generateIdStr } from '_tests_/utils'
import subTaskFixtures from 'fixtures/subTask'

import { CreateSubTaskModalProps } from '../interfaces'

export const requiredProps: CreateSubTaskModalProps = {
  recordId: generateIdStr(),
  initialFormValues: {},
  isLoading: false,
  templateOptions: subTaskFixtures.getSubTaskTemplateList(2),
  templateOptionsIsLoading: false,
  onCancel: jest.fn(),
  onSubmit: jest.fn(),
}
