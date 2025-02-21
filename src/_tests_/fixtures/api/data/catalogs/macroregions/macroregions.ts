import times from 'lodash/times'

import {
  MacroregionCatalogItemDTO,
  MacroregionsCatalogDTO,
} from 'shared/catalogs/macroregions/api/dto/macroregionsCatalog.dto'

import { fakeInteger, fakeWord } from '_tests_/helpers'

export const macroregionCatalogItem = (): MacroregionCatalogItemDTO => ({
  id: fakeInteger(),
  title: fakeWord(),
})

export const macroregionsCatalog = (length: number = 1): MacroregionsCatalogDTO =>
  times(length, () => macroregionCatalogItem())
