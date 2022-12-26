import { generateId, generateWord } from '_tests_/utils'
import { TaskWorkGroupModel } from 'modules/task/models'

export const getTaskWorkGroup = (): TaskWorkGroupModel => ({
  id: generateId(),
  name: generateWord(),
})
