import isUndefined from 'lodash/isUndefined'

import { FaChangeTypeCatalogItemDTO } from 'shared/catalogs/faChangeTypes/api/dto/faChangeTypesCatalog.dto'

import { fakeId, fakeWord } from '_tests_/helpers'

export const faChangeTypeCatalogItem = (
  props?: Partial<Pick<FaChangeTypeCatalogItemDTO, 'isDefault'>>,
): FaChangeTypeCatalogItemDTO => ({
  isDefault: isUndefined(props?.isDefault) ? false : props!.isDefault,

  id: fakeId(),
  title: fakeWord(),
})
