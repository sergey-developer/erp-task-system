import times from 'lodash/times'

import {
  WorkGroupListItemModel,
  WorkGroupTypeEnum,
} from 'modules/workGroup/models'

import { ArrayItem } from 'shared/interfaces/utils'

import { fakeId, fakeInteger, fakeName, fakeWord } from '_tests_/utils'

export const fakeWorkGroupMember = (): ArrayItem<
  WorkGroupListItemModel['members']
> => ({ id: fakeId(), fullName: fakeName() })

export const fakeWorkGroupPriority = (
  props?: Partial<
    Omit<NonNullable<WorkGroupListItemModel['priority']>, 'description'>
  >,
): NonNullable<WorkGroupListItemModel['priority']> => ({
  type: props?.type || WorkGroupTypeEnum.NoType,
  value:
    props?.value ||
    (fakeInteger({
      min: 1,
      max: 4,
    }) as NonNullable<WorkGroupListItemModel['priority']>['value']),
  description: fakeWord(),
})

export const fakeWorkGroupMemberList = (
  length: number = 1,
): WorkGroupListItemModel['members'] =>
  times(length, () => fakeWorkGroupMember())

export const fakeWorkGroup = (
  props?: Partial<{
    seniorEngineerId: number
    groupLeadId: number
    memberAmount: number
  }> &
    Partial<Pick<WorkGroupListItemModel, 'id' | 'priority'>>,
): NonNullable<WorkGroupListItemModel> => ({
  id: props?.id || fakeId(),
  name: fakeName(),
  members: fakeWorkGroupMemberList(props?.memberAmount),
  seniorEngineer: {
    id: props?.seniorEngineerId || fakeId(),
    fullName: fakeName(),
  },
  groupLead: {
    id: props?.groupLeadId || fakeId(),
    fullName: fakeName(),
  },
  priority: props?.priority || fakeWorkGroupPriority(),
})
