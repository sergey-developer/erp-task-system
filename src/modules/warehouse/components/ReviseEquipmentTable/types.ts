import { EditableProTableProps } from '@ant-design/pro-table/es/components/EditableTable'

import { InventorizationEquipmentListItemModel } from 'modules/warehouse/models'

import { LocationsModel } from 'shared/models/catalogs/location'
import { IdType } from 'shared/types/common'
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

  onChangeQuantityFact: (record: InventorizationEquipmentTableItem, value: number) => Promise<void>
  onChangeLocationFact: (record: InventorizationEquipmentTableItem, value: IdType) => Promise<void>
}
