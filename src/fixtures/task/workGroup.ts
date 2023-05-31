import { TaskWorkGroupModel } from 'modules/task/models'

import { fakeId, fakeWord } from '_tests_/utils'

export const fakeWorkGroup = (
  props?: Partial<Pick<TaskWorkGroupModel, 'id'>>,
): TaskWorkGroupModel => ({
  id: props?.id || fakeId(),

  name: fakeWord(),
})
