import { BaseUserModel } from 'features/user/api/dto'

import { IdType } from 'shared/types/common'

export type TaskReclassificationRequestModel = {
  id: IdType
  createdAt: string
  comment: string
  user: Pick<BaseUserModel, 'id' | 'firstName' | 'lastName' | 'middleName'>
}
