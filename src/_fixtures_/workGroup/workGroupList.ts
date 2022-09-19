import { times } from 'lodash'

import { WorkGroupListItemModel } from 'modules/workGroup/features/WorkGroupList/models'

import { getWorkGroup } from './workGroup'

export const getWorkGroupList = (
  length: number = 1,
): Array<WorkGroupListItemModel> => times(length, () => getWorkGroup())
