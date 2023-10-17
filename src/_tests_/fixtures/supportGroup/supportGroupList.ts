import times from 'lodash/times'

import { SupportGroupListItemModel, SupportGroupListModel } from 'modules/supportGroup/models'

import { fakeId, fakeWord } from '_tests_/utils'

export const supportGroupListItem = (): SupportGroupListItemModel => ({
  id: fakeId(),
  name: fakeWord(),
})

export const supportGroupList = (length: number = 1): SupportGroupListModel =>
  times(length, () => supportGroupListItem())
