import times from 'lodash/times'

import {
  WorkGroupListItemModel,
  WorkGroupListModel,
  WorkGroupTypeEnum,
} from 'modules/workGroup/models'

import { ArrayItem } from 'shared/interfaces/utils'

import { fakeId, fakeInteger, fakeName, fakeWord } from '_tests_/utils'

export const workGroupMember = (): ArrayItem<
  WorkGroupListItemModel['members']
> => ({ id: fakeId(), fullName: fakeName() })

export const workGroupPriority = (
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

export const workGroupMemberList = (
  length: number = 1,
): WorkGroupListItemModel['members'] => times(length, () => workGroupMember())

export const workGroup = (
  props?: Partial<{
    seniorEngineerId: number
    groupLeadId: number
    memberAmount: number
  }> &
    Partial<Pick<WorkGroupListItemModel, 'id' | 'priority'>>,
): NonNullable<WorkGroupListItemModel> => ({
  id: props?.id || fakeId(),
  members: workGroupMemberList(props?.memberAmount),
  seniorEngineer: {
    id: props?.seniorEngineerId || fakeId(),
    fullName: fakeName(),
  },
  groupLead: {
    id: props?.groupLeadId || fakeId(),
    fullName: fakeName(),
  },
  priority: props?.priority || workGroupPriority(),

  name: fakeName(),
})

export const workGroupList = (length: number = 1): WorkGroupListModel =>
  times(length, () => workGroup())
