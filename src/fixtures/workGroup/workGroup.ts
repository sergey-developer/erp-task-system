import times from 'lodash/times'

import {
  WorkGroupListItemModel,
  WorkGroupTypeEnum,
} from 'modules/workGroup/models'

import { ArrayItem } from 'shared/interfaces/utils'

import {
  generateId,
  generateInteger,
  generateName,
  generateWord,
} from '_tests_/utils'

export const getWorkGroupMember = (): ArrayItem<
  WorkGroupListItemModel['members']
> => ({ id: generateId(), fullName: generateName() })

export const getWorkGroupMemberList = (
  length: number = 1,
): WorkGroupListItemModel['members'] =>
  times(length, () => getWorkGroupMember())

export const getWorkGroup = (
  props?: Partial<{
    seniorEngineerId: number
    groupLeadId: number
    memberAmount: number
  }> &
    Partial<Pick<WorkGroupListItemModel, 'id' | 'type' | 'priority'>>,
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
  type: props?.type || WorkGroupTypeEnum.NoType,
  description: generateWord(),
  priority:
    props?.priority ||
    (generateInteger({
      min: 1,
      max: 4,
    }) as WorkGroupListItemModel['priority']),
})
