import { SubTaskTemplateModel } from './subTaskTemplate.model'

export type SubTaskTemplateListItemModel = Pick<SubTaskTemplateModel, 'id' | 'code' | 'title'>

export type SubTaskTemplateListModel = SubTaskTemplateListItemModel[]
