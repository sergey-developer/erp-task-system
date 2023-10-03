import times from 'lodash/times'

import { LocationTypeEnum } from 'shared/constants/catalogs'
import { LocationListItemModel, LocationListModel } from 'shared/models/catalogs/location'

import { fakeId, fakeWord } from '_tests_/utils'

export const locationListItem = (): LocationListItemModel => ({
  id: fakeId(),
  title: fakeWord(),
  type: LocationTypeEnum.Shop,
})

export const locationList = (length: number = 1): LocationListModel =>
  times(length, () => locationListItem())
