import times from 'lodash/times'

import { WorkGroupListModel } from 'modules/workGroup/models'

import { getWorkGroup } from './workGroup'

export const getWorkGroupList = (length: number = 1): WorkGroupListModel =>
  times(length, () => getWorkGroup())
