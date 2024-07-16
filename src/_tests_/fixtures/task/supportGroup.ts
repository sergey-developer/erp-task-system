import isUndefined from 'lodash/isUndefined'

import { TaskModel } from 'modules/task/models'

import { fakeId, fakeWord } from '_tests_/utils'

export const supportGroup = (
  props?: Partial<Pick<NonNullable<TaskModel['supportGroup']>, 'hasResolutionClassifiers'>>,
): TaskModel['supportGroup'] => ({
  hasResolutionClassifiers: isUndefined(props?.hasResolutionClassifiers)
    ? false
    : props!.hasResolutionClassifiers,

  id: fakeId(),
  name: fakeWord(),
})
