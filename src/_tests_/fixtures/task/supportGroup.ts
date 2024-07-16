import isUndefined from 'lodash/isUndefined'

import { BaseTaskModel } from 'modules/task/models'

import { fakeId, fakeWord } from '_tests_/utils'

export const supportGroup = (
  props?: Partial<Pick<NonNullable<BaseTaskModel['supportGroup']>, 'hasResolutionClassifiers'>>,
): BaseTaskModel['supportGroup'] => ({
  hasResolutionClassifiers: isUndefined(props?.hasResolutionClassifiers)
    ? false
    : props!.hasResolutionClassifiers,

  id: fakeId(),
  name: fakeWord(),
})
