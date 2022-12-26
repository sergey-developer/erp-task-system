import times from 'lodash/times'

import { WorkGroupListItemModel } from 'modules/workGroup/models'

import { getWorkGroup } from './workGroup'

export const getWorkGroupList = (
  length: number = 1,
): Array<WorkGroupListItemModel> => times(length, () => getWorkGroup())
