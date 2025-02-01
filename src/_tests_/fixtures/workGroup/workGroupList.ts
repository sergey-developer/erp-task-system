import times from 'lodash/times'

import { IdType } from 'shared/types/common'
import { ArrayFirst } from 'shared/types/utils'
import { WorkGroupDTO, WorkGroupsDTO, WorkGroupTypeEnum } from 'shared/workGroups/api/dto'

import { fakeId, fakeInteger, fakeName, fakeWord } from '_tests_/utils'

export const workGroupMember = (): ArrayFirst<WorkGroupDTO['members']> => ({
  id: fakeId(),
  fullName: fakeName(),
})

export const workGroupPriority = (
  props?: Partial<Omit<NonNullable<WorkGroupDTO['priority']>, 'description'>>,
): NonNullable<WorkGroupDTO['priority']> => ({
  type: props?.type || WorkGroupTypeEnum.NoType,
  value:
    props?.value ||
    (fakeInteger({
      min: 1,
      max: 4,
    }) as NonNullable<WorkGroupDTO['priority']>['value']),

  description: fakeWord(),
})

export const workGroupMemberList = (length: number = 1): WorkGroupDTO['members'] =>
  times(length, () => workGroupMember())

export const workGroupListItem = (
  props?: Partial<{
    seniorEngineerId: IdType
    groupLeadId: IdType
    memberAmount: number
  }> &
    Partial<Pick<WorkGroupDTO, 'id' | 'priority'>>,
): NonNullable<WorkGroupDTO> => ({
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

export const workGroupList = (length: number = 1): WorkGroupsDTO =>
  times(length, () => workGroupListItem())
