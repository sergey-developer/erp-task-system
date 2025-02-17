import times from 'lodash/times'

import { LocationTypeEnum } from 'shared/catalogs/locations/api/constants'
import { LocationCatalogItemDTO, LocationsCatalogDTO } from 'shared/catalogs/locations/api/dto'

import { fakeId, fakeWord } from '_tests_/helpers'

export const locationCatalogItem = (
  props?: Partial<Pick<LocationCatalogItemDTO, 'type' | 'id' | 'title'>>,
): LocationCatalogItemDTO => ({
  type: props?.type || LocationTypeEnum.Shop,
  id: props?.id || fakeId(),
  title: props?.title || fakeWord(),
})

export const locationsCatalog = (length: number = 1): LocationsCatalogDTO =>
  times(length, () => locationCatalogItem())
