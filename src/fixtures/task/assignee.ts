import { generateId, generateWord } from '_tests_/utils'
import { TaskAssigneeModel } from 'modules/task/models'

export const getAssignee = (): TaskAssigneeModel => ({
  id: generateId(),
  firstName: generateWord(),
  lastName: generateWord(),
  middleName: generateWord(),
})
