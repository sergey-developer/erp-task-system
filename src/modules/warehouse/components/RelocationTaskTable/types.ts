import { TableProps } from 'antd'

import {
  GetRelocationTaskListSortValue,
  RelocationTaskListItemModel,
} from 'modules/warehouse/models'

export type RelocationTaskTableItem = Pick<
  RelocationTaskListItemModel,
  | 'id'
  | 'deadlineAt'
  | 'relocateFrom'
  | 'relocateTo'
  | 'executor'
  | 'status'
  | 'createdBy'
  | 'createdAt'
>

export type RelocationTaskTableProps = Required<
  Pick<TableProps<RelocationTaskTableItem>, 'dataSource' | 'loading' | 'onChange' | 'pagination'>
> & {
  sort?: GetRelocationTaskListSortValue
}
