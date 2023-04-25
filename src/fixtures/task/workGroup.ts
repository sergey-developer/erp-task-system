import { TaskWorkGroup } from 'modules/task/models'

import { fakeId, fakeWord } from '_tests_/utils'

export const getWorkGroup = (
  props?: Partial<Pick<TaskWorkGroup, 'id'>>,
): TaskWorkGroup => ({
  id: props?.id || fakeId(),
  name: fakeWord(),
})
