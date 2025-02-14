import { UploadFile } from 'antd/es/upload'
import { UserDetailDTO } from 'features/users/api/dto'

import { IdType } from './common'

export type FileToSend = NonNullable<UploadFile['originFileObj']>

export type RequestWithFile = {
  file: FileToSend
}

export type FileResponse = Partial<{
  id: IdType
  url: string
  title: string
  size: number
  createdBy: Pick<UserDetailDTO, 'firstName' | 'lastName' | 'middleName'>
  createdAt: string
}>
