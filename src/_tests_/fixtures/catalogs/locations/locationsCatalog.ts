import times from 'lodash/times'

import { LocationCatalogItemDTO, LocationsCatalogDTO } from 'shared/catalogs/api/dto/locations'
import { LocationTypeEnum } from 'shared/catalogs/constants'

import { fakeId, fakeWord } from '_tests_/utils'

export const locationCatalogListItem = (
  props?: Partial<Pick<LocationCatalogItemDTO, 'type' | 'id' | 'title'>>,
): LocationCatalogItemDTO => ({
  type: props?.type || LocationTypeEnum.Shop,
  id: props?.id || fakeId(),
  title: props?.title || fakeWord(),
})

export const locationsCatalog = (length: number = 1): LocationsCatalogDTO =>
  times(length, () => locationCatalogListItem())
