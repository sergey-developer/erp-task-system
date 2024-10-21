import { EditableProTableProps } from '@ant-design/pro-table/es/components/EditableTable'

import { InventorizationEquipmentListItemModel } from 'modules/warehouse/models'

import { LocationsCatalogModel } from 'shared/models/catalogs/locations'
import { Nullable, SetNonNullable } from 'shared/types/utils'

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
  fulfilledTimeStamp?: number

  locations: LocationsCatalogModel
  locationsIsLoading: boolean

  onChangeQuantityFact: (
    record: ReviseInventorizationEquipmentTableItem,
    value: Nullable<number>,
    locationFact: NonNullable<ReviseInventorizationEquipmentTableItem['locationFact']>,
  ) => Promise<void>
  changeQuantityFactIsLoading: boolean

  onChangeLocationFact: (
    record: ReviseInventorizationEquipmentTableItem,
    value: NonNullable<ReviseInventorizationEquipmentTableItem['locationFact']>,
    quantityFact: ReviseInventorizationEquipmentTableItem['quantity']['fact'],
  ) => Promise<void>
  changeLocationFactIsLoading: boolean
}
