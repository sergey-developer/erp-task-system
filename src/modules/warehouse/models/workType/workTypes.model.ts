import { WorkTypeModel } from 'modules/warehouse/models'

export type WorkTypeListItemModel = Pick<WorkTypeModel, 'id' | 'title'>
export type WorkTypesModel = WorkTypeListItemModel[]
