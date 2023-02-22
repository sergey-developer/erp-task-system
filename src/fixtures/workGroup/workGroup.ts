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

export const getWorkGroupPriority = (
  props?: Partial<
    Omit<NonNullable<WorkGroupListItemModel['priority']>, 'description'>
  >,
): NonNullable<WorkGroupListItemModel['priority']> => ({
  type: props?.type || WorkGroupTypeEnum.NoType,
  value:
    props?.value ||
    (generateInteger({
      min: 1,
      max: 4,
    }) as NonNullable<WorkGroupListItemModel['priority']>['value']),
  description: generateWord(),
})

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
    Partial<Pick<WorkGroupListItemModel, 'id' | 'priority'>>,
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
  priority: props?.priority || getWorkGroupPriority(),
})
