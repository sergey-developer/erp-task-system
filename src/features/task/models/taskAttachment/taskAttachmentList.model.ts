import { TaskAttachmentModel } from 'features/task/models'

export type TaskAttachmentListItemModel = Pick<
  TaskAttachmentModel,
  'id' | 'name' | 'size' | 'url' | 'externalId'
>

export type TaskAttachmentListModel = TaskAttachmentListItemModel[]
