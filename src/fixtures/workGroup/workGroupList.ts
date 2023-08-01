import times from 'lodash/times'

import { WorkGroupListModel } from 'modules/workGroup/models'

import { fakeWorkGroup } from './workGroup'

export const fakeWorkGroupList = (length: number = 1): WorkGroupListModel =>
  times(length, () => fakeWorkGroup())
