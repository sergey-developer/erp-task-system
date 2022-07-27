import { FileModel } from 'shared/interfaces/models'
import { MaybeNull } from 'shared/interfaces/utils'

export type TaskAttachmentModel = {
  id: number
  source: FileModel
  externalId: string
  task: number
  extension?: MaybeNull<string>
}
