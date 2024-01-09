import { UploadProps } from 'antd'

import { RelocationTaskListItemModel } from 'modules/warehouse/models'

export type RelocationTaskListProps = {
  data: RelocationTaskListItemModel[]
  onClick: (id: RelocationTaskListItemModel['id']) => void
  onCreateAttachment: (
    id: RelocationTaskListItemModel['id'],
  ) => (options: Parameters<NonNullable<UploadProps['customRequest']>>[0]) => Promise<void>
}
