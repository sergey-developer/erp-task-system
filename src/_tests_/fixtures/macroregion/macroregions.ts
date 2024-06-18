import times from 'lodash/times'

import { MacroregionListItemModel, MacroregionsModel } from 'shared/models/macroregion'

import { fakeInteger, fakeWord } from '_tests_/utils'

export const macroregionListItem = (): MacroregionListItemModel => ({
  id: fakeInteger(),
  title: fakeWord(),
})

export const macroregions = (length: number = 1): MacroregionsModel =>
  times(length, () => macroregionListItem())
