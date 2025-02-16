import { TaskDetailDTO } from 'features/tasks/api/dto'
import isUndefined from 'lodash/isUndefined'

import { fakeId, fakeWord } from '_tests_/helpers'

export const supportGroup = (
  props?: Partial<Pick<NonNullable<TaskDetailDTO['supportGroup']>, 'hasResolutionClassifiers'>>,
): TaskDetailDTO['supportGroup'] => ({
  hasResolutionClassifiers: isUndefined(props?.hasResolutionClassifiers)
    ? false
    : props!.hasResolutionClassifiers,

  id: fakeId(),
  name: fakeWord(),
})
