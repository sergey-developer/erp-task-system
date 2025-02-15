import { TableProps } from 'antd'
import { RelocationTaskCompletionDocumentDTO } from 'features/relocationTasks/api/dto'

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
