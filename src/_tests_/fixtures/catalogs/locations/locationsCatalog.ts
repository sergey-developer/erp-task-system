import times from 'lodash/times'

import { LocationTypeEnum } from 'shared/constants/catalogs'
import {
  LocationCatalogListItemModel,
  LocationsCatalogModel,
} from 'shared/models/catalogs/locations'

import { fakeId, fakeWord } from '_tests_/utils'

export const locationCatalogListItem = (
  props?: Partial<Pick<LocationCatalogListItemModel, 'type' | 'id' | 'title'>>,
): LocationCatalogListItemModel => ({
  type: props?.type || LocationTypeEnum.Shop,
  id: props?.id || fakeId(),
  title: props?.title || fakeWord(),
})

export const locationsCatalog = (length: number = 1): LocationsCatalogModel =>
  times(length, () => locationCatalogListItem())
