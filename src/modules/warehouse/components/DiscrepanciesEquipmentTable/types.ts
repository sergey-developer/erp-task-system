import { TableProps } from 'antd'

import {
  GetInventorizationEquipmentsSortValue,
  InventorizationEquipmentListItemModel,
} from 'modules/warehouse/models'

import { TableSortProps } from 'shared/types/sort'
import { SetNonNullable } from 'shared/types/utils'

export type DiscrepanciesEquipmentTableItem = Pick<
  InventorizationEquipmentListItemModel,
  'id' | 'equipment' | 'locationPlan' | 'locationFact' | 'quantity'
>

export type ActiveDiscrepanciesEquipmentTableRow = {
  rowIndex: number
}

export type DiscrepanciesEquipmentTableProps = SetNonNullable<
  TableProps<DiscrepanciesEquipmentTableItem>,
  'pagination' | 'dataSource' | 'onChange' | 'loading'
> &
  TableSortProps<GetInventorizationEquipmentsSortValue>
