import { RelocationTaskModel } from './relocationTask.model'

export type RelocationTaskListItemModel = Pick<
  RelocationTaskModel,
  | 'id'
  | 'type'
  | 'deadlineAt'
  | 'relocateFrom'
  | 'relocateTo'
  | 'executor'
  | 'status'
  | 'createdBy'
  | 'createdAt'
>

export type RelocationTaskListModel = RelocationTaskListItemModel[]
