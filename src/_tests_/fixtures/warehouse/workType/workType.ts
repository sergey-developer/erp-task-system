import isUndefined from 'lodash/isUndefined'

import { WorkTypeDetailDTO } from 'shared/catalogs/workTypes/api/dto'

import { fakeInteger, fakeWord } from '_tests_/utils'

export const workType = (
  props?: Partial<Pick<WorkTypeDetailDTO, 'actions'>>,
): WorkTypeDetailDTO => ({
  id: fakeInteger(),
  title: fakeWord(),

  actions: isUndefined(props?.actions) ? null : props!.actions,
})
