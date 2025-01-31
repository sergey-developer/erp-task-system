import times from 'lodash/times'

import {
  MacroregionListItemModel,
  MacroregionsCatalogModel,
} from 'shared/catalogs/api/dto/macroregions'

import { fakeInteger, fakeWord } from '_tests_/utils'

export const macroregionListItem = (): MacroregionListItemModel => ({
  id: fakeInteger(),
  title: fakeWord(),
})

export const macroregions = (length: number = 1): MacroregionsCatalogModel =>
  times(length, () => macroregionListItem())
