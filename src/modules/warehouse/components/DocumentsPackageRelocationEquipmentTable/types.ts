import { TableProps } from 'antd'

import { RelocationCompletionDocumentModel } from 'modules/warehouse/models'

import { ArrayFirst } from 'shared/types/utils'

export type DocumentsPackageRelocationEquipmentTableItem = ArrayFirst<
  RelocationCompletionDocumentModel['relocationEquipments']
>

export type DocumentsPackageRelocationEquipmentTableProps = Pick<
  TableProps<DocumentsPackageRelocationEquipmentTableItem>,
  'dataSource'
> & {
  onClickTechnicalExamination: (id: DocumentsPackageRelocationEquipmentTableItem['id']) => void
}
