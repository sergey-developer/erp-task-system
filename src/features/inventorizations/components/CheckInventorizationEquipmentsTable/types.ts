import { TableProps } from 'antd'

import { SetNonNullable } from 'shared/types/utils'

import { CheckedInventorizationEquipmentsTemplateItemDTO } from '../../api/dto'

export type CheckInventorizationEquipmentsTableRow = Pick<
  CheckedInventorizationEquipmentsTemplateItemDTO,
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
