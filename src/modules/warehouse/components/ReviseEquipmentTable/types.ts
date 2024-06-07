import { EditableProTableProps } from '@ant-design/pro-table/es/components/EditableTable'

import { InventorizationEquipmentListItemModel } from 'modules/warehouse/models'

import { LocationsModel } from 'shared/models/catalogs/location'
import { IdType } from 'shared/types/common'
import { MaybeNull, SetNonNullable } from 'shared/types/utils'

export type InventorizationEquipmentTableItem = InventorizationEquipmentListItemModel

export type ActiveInventorizationEquipmentRow = {
  rowIndex: number
  tableName: EditableProTableProps<InventorizationEquipmentTableItem, any>['name']
}

export type ReviseEquipmentTableProps = SetNonNullable<
  EditableProTableProps<InventorizationEquipmentTableItem, any>,
  'pagination' | 'dataSource' | 'onTableChange' | 'loading'
> & {
  locations: LocationsModel
  locationsIsLoading: boolean

  onChangeQuantityFact: (
    record: InventorizationEquipmentTableItem,
    value: number,
    locationFact: MaybeNull<IdType>,
  ) => Promise<void>

  onChangeLocationFact: (
    record: InventorizationEquipmentTableItem,
    value: IdType,
    quantityFact: InventorizationEquipmentTableItem['quantity']['fact'],
  ) => Promise<void>
}
