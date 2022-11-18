import { generateId } from '_tests_/utils'
import * as workGroupFixtures from 'fixtures/workGroup'

import { TaskSecondLineModalProps } from '../index'

export const requiredProps: TaskSecondLineModalProps = {
  id: generateId(),
  isLoading: false,
  workGroupList: workGroupFixtures.getWorkGroupList(),
  workGroupListIsLoading: false,
  onCancel: jest.fn(),
  onSubmit: jest.fn(),
}
