import { MaybeNull } from 'shared/interfaces/utils'
import { FileModel } from 'shared/models'

export type TaskAttachmentModel = {
  id: number
  source: FileModel
  externalId: string
  task: number
  extension?: MaybeNull<string>
}
