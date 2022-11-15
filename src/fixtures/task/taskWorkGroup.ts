import { generateId, generateWord } from '_tests_/utils'
import { TaskDetailsWorkGroupModel } from 'modules/task/features/TaskView/models'

export const getTaskWorkGroup = (): TaskDetailsWorkGroupModel => ({
  id: generateId(),
  name: generateWord(),
})
