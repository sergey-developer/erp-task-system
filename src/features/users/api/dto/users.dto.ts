import { IdType } from 'shared/types/common'

export type UserDTO = {
  id: IdType
  fullName: string
}

export type UsersDTO = UserDTO[]
