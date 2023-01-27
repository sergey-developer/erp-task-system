export enum WorkGroupTypeEnum {
  AssociatedWithSapId = 'associated_with_sap_id',
  DefaultForSupportGroup = 'default_for_support_group',
  RelevantToSupportGroup = 'relevant_to_support_group',
  NoType = 'no_type',
}

type WorkGroupListMemberModel = {
  id: number
  fullName: string
}

export type WorkGroupListItemModel = {
  id: number
  name: string
  seniorEngineer: WorkGroupListMemberModel
  groupLead: WorkGroupListMemberModel
  members: Array<WorkGroupListMemberModel>
  type?: WorkGroupTypeEnum
  priority?: 1 | 2 | 3 | 4
  description?: string
}

export type WorkGroupListModel = Array<WorkGroupListItemModel>
