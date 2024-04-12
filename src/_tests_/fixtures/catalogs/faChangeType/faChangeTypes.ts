import isUndefined from 'lodash/isUndefined'

import { FaChangeTypeListItemModel } from 'shared/models/catalogs/faChangeTypes'

import { fakeId, fakeWord } from '_tests_/utils'

export const faChangeTypeListItem = (
  props?: Partial<Pick<FaChangeTypeListItemModel, 'isDefault'>>,
): FaChangeTypeListItemModel => ({
  isDefault: isUndefined(props?.isDefault) ? false : props!.isDefault,

  id: fakeId(),
  title: fakeWord(),
})
