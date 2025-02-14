import { EditableProTableProps } from '@ant-design/pro-table/es/components/EditableTable'

import { LocationsCatalogDTO } from 'shared/catalogs/locations/api/dto'
import { Nullable, SetNonNullable } from 'shared/types/utils'

import { InventorizationEquipmentDTO } from '../../api/dto'

export type ReviseInventorizationEquipmentTableItem = Pick<
  InventorizationEquipmentDTO,
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

  locations: LocationsCatalogDTO
  locationsIsLoading: boolean

  onChangeQuantityFact: (
    record: ReviseInventorizationEquipmentTableItem,
    value: Nullable<number>,
    locationFact: ReviseInventorizationEquipmentTableItem['locationFact'],
  ) => Promise<void>
  changeQuantityFactIsLoading: boolean

  onChangeLocationFact: (
    record: ReviseInventorizationEquipmentTableItem,
    value: NonNullable<ReviseInventorizationEquipmentTableItem['locationFact']>,
    quantityFact: ReviseInventorizationEquipmentTableItem['quantity']['fact'],
  ) => Promise<void>
  changeLocationFactIsLoading: boolean
}
