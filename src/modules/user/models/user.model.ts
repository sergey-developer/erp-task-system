import { MaybeNull } from 'shared/interfaces/utils'

export type UserModel = {
  id: number
  firstName: string
  lastName: string
  middleName: MaybeNull<string>
  avatar: MaybeNull<string>
}
