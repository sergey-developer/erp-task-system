import { IdType } from 'shared/types/common'
import { MaybeNull } from 'shared/types/utils'
import { WorkGroupTypeEnum } from 'shared/workGroups/constants'

type WorkGroupListMemberModel = {
  id: IdType
  fullName: string
}

export type WorkGroupListItemModel = {
  id: IdType
  name: string
  seniorEngineer: WorkGroupListMemberModel
  groupLead: WorkGroupListMemberModel
  members: WorkGroupListMemberModel[]
  priority: MaybeNull<{
    value: 1 | 2 | 3 | 4
    type: WorkGroupTypeEnum
    description: string
  }>
}

export type WorkGroupsModel = WorkGroupListItemModel[]
