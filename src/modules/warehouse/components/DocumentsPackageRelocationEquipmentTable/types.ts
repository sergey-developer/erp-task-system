import { TableProps } from 'antd'

import { RelocationTaskCompletionDocumentModel } from 'modules/warehouse/models'

import { ArrayFirst } from 'shared/types/utils'

export type DocumentsPackageRelocationEquipmentTableItem = ArrayFirst<
  RelocationTaskCompletionDocumentModel['relocationEquipments']
>

export type DocumentsPackageRelocationEquipmentTableProps = Pick<
  TableProps<DocumentsPackageRelocationEquipmentTableItem>,
  'dataSource'
> & {
  onClickTechnicalExamination: (id: DocumentsPackageRelocationEquipmentTableItem['id']) => void
}
