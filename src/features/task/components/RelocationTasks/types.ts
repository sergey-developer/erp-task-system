import { UploadProps } from 'antd'

import { RelocationTaskListItemModel } from 'features/warehouse/models'

export type RelocationTasksProps = {
  data: RelocationTaskListItemModel[]
  onClick: (id: RelocationTaskListItemModel['id']) => void
  onCreateAttachment: (
    id: RelocationTaskListItemModel['id'],
  ) => (options: Parameters<NonNullable<UploadProps['customRequest']>>[0]) => Promise<void>
}
