import { RcFile } from 'antd/es/upload'
import { UploadFile as BaseUploadFile } from 'antd/es/upload/interface'

export type UploadFile = Pick<
  BaseUploadFile,
  | 'uid'
  | 'type'
  | 'size'
  | 'percent'
  | 'originFileObj'
  | 'name'
  | 'lastModified'
  | 'lastModifiedDate'
>

export type FileToSend = RcFile
