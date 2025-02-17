import { TaskSupportGroupDTO } from 'features/tasks/api/dto'
import isUndefined from 'lodash/isUndefined'

import { fakeId, fakeWord } from '_tests_/helpers'

export const taskSupportGroup = (
  props?: Partial<Pick<TaskSupportGroupDTO, 'hasResolutionClassifiers'>>,
): TaskSupportGroupDTO => ({
  hasResolutionClassifiers: isUndefined(props?.hasResolutionClassifiers)
    ? false
    : props!.hasResolutionClassifiers,

  id: fakeId(),
  name: fakeWord(),
})
