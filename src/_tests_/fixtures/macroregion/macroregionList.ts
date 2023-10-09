import times from 'lodash/times'

import { MacroregionListItemModel, MacroregionListModel } from 'shared/models/macroregion'

import { fakeInteger, fakeWord } from '_tests_/utils'

export const macroregionListItem = (): MacroregionListItemModel => ({
  id: fakeInteger(),
  title: fakeWord(),
})

export const macroregionList = (length: number = 1): MacroregionListModel =>
  times(length, () => macroregionListItem())
