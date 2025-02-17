import isUndefined from 'lodash/isUndefined'

import { WorkTypeDetailDTO } from 'shared/catalogs/workTypes/api/dto'

import { fakeInteger, fakeWord } from '_tests_/helpers'

export const workTypeDetail = (
  props?: Partial<Pick<WorkTypeDetailDTO, 'actions'>>,
): WorkTypeDetailDTO => ({
  id: fakeInteger(),
  title: fakeWord(),

  actions: isUndefined(props?.actions) ? null : props!.actions,
})
