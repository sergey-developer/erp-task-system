import { EditableProTableProps } from '@ant-design/pro-table/es/components/EditableTable'

import { InventorizationEquipmentListItemModel } from 'modules/warehouse/models'

import { LocationsCatalogModel } from 'shared/models/catalogs/locations'
import { IdType } from 'shared/types/common'
import { MaybeNull, Nullable, SetNonNullable } from 'shared/types/utils'

export type ReviseInventorizationEquipmentTableItem = Pick<
  InventorizationEquipmentListItemModel,
  | 'id'
  | 'equipment'
  | 'locationPlan'
  | 'locationFact'
  | 'quantity'
  | 'hasDiff'
  | 'isFilled'
  | 'isLocationFactUndefined'
>

export type ReviseInventorizationEquipmentTableProps = SetNonNullable<
  EditableProTableProps<ReviseInventorizationEquipmentTableItem, any>,
  'pagination' | 'dataSource' | 'onTableChange' | 'loading'
> & {
  locations: LocationsCatalogModel
  locationsIsLoading: boolean

  onChangeQuantityFact: (
    record: ReviseInventorizationEquipmentTableItem,
    value: Nullable<number>,
    locationFact: MaybeNull<IdType>,
  ) => Promise<void>

  onChangeLocationFact: (
    record: ReviseInventorizationEquipmentTableItem,
    value: IdType,
    quantityFact: ReviseInventorizationEquipmentTableItem['quantity']['fact'],
  ) => Promise<void>
}
