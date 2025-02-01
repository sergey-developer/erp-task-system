import { IdType } from 'shared/types/common'
import { MaybeNull } from 'shared/types/utils'
import { WorkGroupTypeEnum } from 'shared/workGroups/constants'

type WorkGroupMemberDTO = {
  id: IdType
  fullName: string
}

export type WorkGroupDTO = {
  id: IdType
  name: string
  seniorEngineer: WorkGroupMemberDTO
  groupLead: WorkGroupMemberDTO
  members: WorkGroupMemberDTO[]
  priority: MaybeNull<{
    value: 1 | 2 | 3 | 4
    type: WorkGroupTypeEnum
    description: string
  }>
}

export type WorkGroupsDTO = WorkGroupDTO[]
