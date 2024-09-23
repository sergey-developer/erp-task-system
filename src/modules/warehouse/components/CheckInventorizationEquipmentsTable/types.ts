import { TableProps } from 'antd'

import { CheckedInventorizationEquipmentModel } from 'modules/warehouse/models'

import { SetNonNullable } from 'shared/types/utils'

export type CheckInventorizationEquipmentsTableRow = Pick<
  CheckedInventorizationEquipmentModel,
  | 'title'
  | 'serialNumber'
  | 'category'
  | 'nomenclature'
  | 'inventoryNumber'
  | 'quantityFact'
  | 'locationFact'
  | 'isCredited'
> & {
  row: number
}

export type CheckInventorizationEquipmentsTableProps = SetNonNullable<
  TableProps<CheckInventorizationEquipmentsTableRow>,
  'dataSource'
>
