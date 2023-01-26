import times from 'lodash/times'

import {
  generateId,
  generateInteger,
  generateName,
  generateWord,
} from '_tests_/utils'
import {
  WorkGroupListItemModel,
  WorkGroupTypeEnum,
} from 'modules/workGroup/models'
import { ArrayItem } from 'shared/interfaces/utils'

export const getWorkGroupMember = (): ArrayItem<
  WorkGroupListItemModel['members']
> => ({ id: generateId(), fullName: generateName() })

export const getWorkGroupMemberList = (
  length: number = 1,
): WorkGroupListItemModel['members'] =>
  times(length, () => getWorkGroupMember())

export const getWorkGroup = (
  props?: Partial<{
    id: number
    seniorEngineerId: number
    groupLeadId: number
    memberAmount: number
  }>,
): NonNullable<WorkGroupListItemModel> => ({
  id: props?.id || generateId(),
  name: generateName(),
  members: getWorkGroupMemberList(props?.memberAmount),
  seniorEngineer: {
    id: props?.seniorEngineerId || generateId(),
    fullName: generateName(),
  },
  groupLead: {
    id: props?.groupLeadId || generateId(),
    fullName: generateName(),
  },
  type: WorkGroupTypeEnum.DefaultForSupportGroup,
  description: generateWord(),
  priority: generateInteger({
    min: 1,
    max: 4,
  }) as WorkGroupListItemModel['priority'],
})
