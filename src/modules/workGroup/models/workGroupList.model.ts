import { IdType } from 'shared/types/common'
import { MaybeNull } from 'shared/types/utils'

export enum WorkGroupTypeEnum {
  AssociatedWithSapId = 'associated_with_SAPID',
  DefaultForSupportGroup = 'default_for_support_group',
  RelevantToSupportGroup = 'relevant_to_support_group',
  NoType = 'no_type',
}

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

export type WorkGroupListModel = WorkGroupListItemModel[]
