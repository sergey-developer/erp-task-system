import isUndefined from 'lodash/isUndefined'

import { FaChangeTypeCatalogItemDTO } from 'shared/catalogs/api/dto/faChangeTypes'

import { fakeId, fakeWord } from '_tests_/utils'

export const faChangeTypeListItem = (
  props?: Partial<Pick<FaChangeTypeCatalogItemDTO, 'isDefault'>>,
): FaChangeTypeCatalogItemDTO => ({
  isDefault: isUndefined(props?.isDefault) ? false : props!.isDefault,

  id: fakeId(),
  title: fakeWord(),
})
