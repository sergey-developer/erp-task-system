import { UploadProps } from 'antd'
import { RelocationTaskDTO } from 'features/relocationTasks/api/dto'

export type RelocationTasksProps = {
  data: RelocationTaskDTO[]
  onClick: (id: RelocationTaskDTO['id']) => void
  onCreateAttachment: (
    id: RelocationTaskDTO['id'],
  ) => (options: Parameters<NonNullable<UploadProps['customRequest']>>[0]) => Promise<void>
}
