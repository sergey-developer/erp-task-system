import { TaskAssigneeModel } from 'modules/task/models'

import { generateId, generateWord } from '_tests_/utils'

export const getAssignee = (): TaskAssigneeModel => ({
  id: generateId(),
  firstName: generateWord(),
  lastName: generateWord(),
  middleName: generateWord(),
})
