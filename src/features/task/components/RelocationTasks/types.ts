import { UploadProps } from 'antd'
import { RelocationTaskDTO } from 'features/warehouse/models'

export type RelocationTasksProps = {
  data: RelocationTaskDTO[]
  onClick: (id: RelocationTaskDTO['id']) => void
  onCreateAttachment: (
    id: RelocationTaskDTO['id'],
  ) => (options: Parameters<NonNullable<UploadProps['customRequest']>>[0]) => Promise<void>
}
