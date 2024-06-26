import { EditableProTableProps } from '@ant-design/pro-table/es/components/EditableTable'

import { InventorizationEquipmentListItemModel } from 'modules/warehouse/models'

import { LocationsModel } from 'shared/models/catalogs/location'
import { IdType } from 'shared/types/common'
import { MaybeNull, Nullable, SetNonNullable } from 'shared/types/utils'

export type ReviseEquipmentTableItem = Pick<
  InventorizationEquipmentListItemModel,
  'id' | 'equipment' | 'locationPlan' | 'locationFact' | 'quantity' | 'hasDiff' | 'isFilled'
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

  onChangeQuantityFact: (
    record: ReviseEquipmentTableItem,
    value: Nullable<number>,
    locationFact: MaybeNull<IdType>,
  ) => Promise<void>

  onChangeLocationFact: (
    record: ReviseEquipmentTableItem,
    value: IdType,
    quantityFact: ReviseEquipmentTableItem['quantity']['fact'],
  ) => Promise<void>
}
