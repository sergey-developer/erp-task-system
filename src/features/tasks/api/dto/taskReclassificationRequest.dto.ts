import { BaseUserType } from 'features/users/api/types'

import { IdType } from 'shared/types/common'

export type TaskReclassificationRequestDTO = {
  id: IdType
  createdAt: string
  comment: string
  user: Pick<BaseUserType, 'id' | 'firstName' | 'lastName' | 'middleName'>
}
