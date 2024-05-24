import { EditableProTableProps } from '@ant-design/pro-table/es/components/EditableTable'

import { InventorizationEquipmentListItemModel } from 'modules/warehouse/models'

import { SetNonNullable } from 'shared/types/utils'

export type ReviseEquipmentTableItem = Pick<
  InventorizationEquipmentListItemModel,
  'id' | 'equipment' | 'locationPlan' | 'quantity'
>

export type ActiveReviseEquipmentTableRow = {
  rowIndex: number
  tableName: EditableProTableProps<ReviseEquipmentTableItem, any>['name']
}

export type ReviseEquipmentTableProps = SetNonNullable<
  EditableProTableProps<ReviseEquipmentTableItem, any>,
  'pagination' | 'dataSource' | 'onTableChange' | 'loading'
>
