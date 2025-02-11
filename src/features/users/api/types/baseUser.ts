import { IdType } from 'shared/types/common'
import { MaybeNull } from 'shared/types/utils'

export type BaseUserType = {
  id: IdType
  firstName: string
  lastName: string
  middleName: MaybeNull<string>
  avatar: MaybeNull<string>
}
