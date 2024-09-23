import { TableProps } from 'antd'

import { CheckedInventorizationEquipmentsTemplateListItemModel } from 'modules/warehouse/models'

import { SetNonNullable } from 'shared/types/utils'

export type CheckInventorizationEquipmentsTableRow = Pick<
  CheckedInventorizationEquipmentsTemplateListItemModel,
  | 'title'
  | 'serialNumber'
  | 'category'
  | 'nomenclature'
  | 'inventoryNumber'
  | 'quantityFact'
  | 'locationFact'
  | 'isCredited'
> & {
  rowId: number
}

export type CheckInventorizationEquipmentsTableProps = SetNonNullable<
  TableProps<CheckInventorizationEquipmentsTableRow>,
  'dataSource'
>
