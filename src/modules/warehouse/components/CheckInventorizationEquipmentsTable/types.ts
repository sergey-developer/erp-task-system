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
  | 'condition'
  | 'comment'
  | 'owner'
  | 'price'
  | 'usageCounter'
  | 'currency'
  | 'isNew'
  | 'isRepaired'
  | 'isWarranty'
  | 'purpose'
  | 'macroregion'
> & {
  rowId: number
}

export type CheckInventorizationEquipmentsTableProps = SetNonNullable<
  TableProps<CheckInventorizationEquipmentsTableRow>,
  'dataSource' | 'loading'
> & {
  onClickEdit: (row: CheckInventorizationEquipmentsTableRow) => void
  editTouchedRowsIds: CheckInventorizationEquipmentsTableRow['rowId'][]
}
