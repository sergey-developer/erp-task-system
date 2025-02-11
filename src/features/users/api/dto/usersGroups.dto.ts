import { IdType } from 'shared/types/common'

export type UsersGroupDTO = {
  id: IdType
  title: string
  users: IdType[]
}

export type UsersGroupsDTO = UsersGroupDTO[]
