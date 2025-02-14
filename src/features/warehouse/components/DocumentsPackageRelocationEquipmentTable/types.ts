import { TableProps } from 'antd'
import { RelocationTaskCompletionDocumentDTO } from 'features/warehouse/models'

import { ArrayFirst } from 'shared/types/utils'

export type DocumentsPackageRelocationEquipmentTableItem = ArrayFirst<
  RelocationTaskCompletionDocumentDTO['relocationEquipments']
>

export type DocumentsPackageRelocationEquipmentTableProps = Pick<
  TableProps<DocumentsPackageRelocationEquipmentTableItem>,
  'dataSource'
> & {
  disabled: boolean
  onClickTechnicalExamination: (
    relocationEquipment: DocumentsPackageRelocationEquipmentTableItem,
  ) => void
}
