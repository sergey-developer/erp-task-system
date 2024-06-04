import { EditableProTableProps } from '@ant-design/pro-table/es/components/EditableTable'

import { InventorizationEquipmentListItemModel } from 'modules/warehouse/models'

import { LocationsModel } from 'shared/models/catalogs/location'
import { SetNonNullable } from 'shared/types/utils'

export type ReviseEquipmentTableItem = Pick<
  InventorizationEquipmentListItemModel,
  'id' | 'equipment' | 'locationPlan' | 'locationFact' | 'quantity' | 'isFilled' | 'hasDiff'
>

export type ActiveReviseEquipmentTableRow = {
  rowIndex: number
  tableName: EditableProTableProps<ReviseEquipmentTableItem, any>['name']
}

export type ReviseEquipmentTableProps = SetNonNullable<
  EditableProTableProps<ReviseEquipmentTableItem, any>,
  'pagination' | 'dataSource' | 'onTableChange' | 'loading'
> & {
  locations: LocationsModel
  locationsIsLoading: boolean

  onChangeQuantityFact: (value: number) => Promise<void>
}
