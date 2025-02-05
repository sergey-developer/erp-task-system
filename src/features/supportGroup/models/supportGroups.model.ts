import { SupportGroupModel } from './supportGroup.model'

export type SupportGroupListItemModel = Pick<SupportGroupModel, 'id' | 'name'>

export type SupportGroupsModel = SupportGroupListItemModel[]
