import isUndefined from 'lodash/isUndefined'

import { WorkTypeModel } from 'features/warehouse/models'

import { fakeInteger, fakeWord } from '_tests_/utils'

export const workType = (props?: Partial<Pick<WorkTypeModel, 'actions'>>): WorkTypeModel => ({
  id: fakeInteger(),
  title: fakeWord(),

  actions: isUndefined(props?.actions) ? null : props!.actions,
})
