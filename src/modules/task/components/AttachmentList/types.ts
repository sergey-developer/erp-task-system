import { MaybeNull, NumberOrString } from 'shared/types/utils'

export type AttachmentListItem = {
  id: NumberOrString
  name: string
  size: number
  url: string
  createdAt?: string
  firstName?: string
  lastName?: string
  middleName?: string
  externalId?: MaybeNull<string>
}

export type AttachmentListProps = {
  data: AttachmentListItem[]
}
