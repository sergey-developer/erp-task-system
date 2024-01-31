import { TableProps } from 'antd'

import {
  GetRelocationTaskListSortValue,
  RelocationTaskListItemModel,
} from 'modules/warehouse/models'

export type RelocationTaskTableItem = Pick<
  RelocationTaskListItemModel,
  | 'id'
  | 'type'
  | 'deadlineAt'
  | 'relocateFrom'
  | 'relocateTo'
  | 'executor'
  | 'controller'
  | 'status'
  | 'createdBy'
  | 'createdAt'
>

export type RelocationTaskTableProps = Required<
  Pick<
    TableProps<RelocationTaskTableItem>,
    'dataSource' | 'loading' | 'onChange' | 'pagination' | 'onRow'
  >
> & {
  sort?: GetRelocationTaskListSortValue
}
