import { UploadFile } from 'antd/es/upload'

import { UserModel } from 'modules/user/models'

import { IdType } from './common'

export type FileToSend = NonNullable<UploadFile['originFileObj']>

export type FileResponse = Partial<{
  id: IdType
  url: string
  title: string
  size: number
  createdBy: Pick<UserModel, 'firstName' | 'lastName' | 'middleName'>
  createdAt: string
}>
