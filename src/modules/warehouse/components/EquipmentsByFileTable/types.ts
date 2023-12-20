import { TableProps } from 'antd'
import { UploadFile } from 'antd/es/upload'

import { CreateEquipmentsBadRequestErrorResponse } from 'modules/warehouse/models'
import { ImportedEquipmentByFile } from 'modules/warehouse/types'

import { FileResponse } from 'shared/types/file'

export type EquipmentByFileTableRow = Pick<ImportedEquipmentByFile, 'rowId'> & {
  title?: NonNullable<ImportedEquipmentByFile['title']>
  customerInventoryNumber?: NonNullable<ImportedEquipmentByFile['customerInventoryNumber']>
  serialNumber?: NonNullable<ImportedEquipmentByFile['serialNumber']>
  comment?: NonNullable<ImportedEquipmentByFile['comment']>
  condition?: NonNullable<ImportedEquipmentByFile['condition']>
  quantity?: NonNullable<ImportedEquipmentByFile['quantity']>
  price?: NonNullable<ImportedEquipmentByFile['price']>
  usageCounter?: NonNullable<ImportedEquipmentByFile['usageCounter']>
  isNew?: NonNullable<ImportedEquipmentByFile['isNew']>
  isWarranty?: NonNullable<ImportedEquipmentByFile['isWarranty']>
  isRepaired?: NonNullable<ImportedEquipmentByFile['isRepaired']>
  category?: NonNullable<ImportedEquipmentByFile['category']>
  currency?: NonNullable<ImportedEquipmentByFile['currency']>
  owner?: NonNullable<ImportedEquipmentByFile['owner']>
  purpose?: NonNullable<ImportedEquipmentByFile['purpose']>
  nomenclature?: NonNullable<ImportedEquipmentByFile['nomenclature']>
  images?: UploadFile<FileResponse>[]
}

export type EquipmentsByFileTableProps = {
  dataSource: NonNullable<TableProps<EquipmentByFileTableRow>['dataSource']>
  onEdit: (row: EquipmentByFileTableRow, index: number) => void
  errors?: CreateEquipmentsBadRequestErrorResponse
}
