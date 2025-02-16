import times from 'lodash/times'

import {
  MacroregionCatalogItemDTO,
  MacroregionsCatalogDTO,
} from 'shared/catalogs/macroregions/api/dto/macroregionsCatalog.dto'

import { fakeInteger, fakeWord } from '_tests_/utils'

export const macroregionListItem = (): MacroregionCatalogItemDTO => ({
  id: fakeInteger(),
  title: fakeWord(),
})

export const macroregions = (length: number = 1): MacroregionsCatalogDTO =>
  times(length, () => macroregionListItem())
