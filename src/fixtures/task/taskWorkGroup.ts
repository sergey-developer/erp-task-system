import { generateId, generateWord } from '_tests_/utils'
import { TaskDetailsWorkGroupModel } from 'modules/task/models'

export const getTaskWorkGroup = (): TaskDetailsWorkGroupModel => ({
  id: generateId(),
  name: generateWord(),
})
