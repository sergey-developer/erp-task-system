import { UploadFile } from 'antd/es/upload/interface'

export type TaskResolutionFormFields = {
  techResolution: string
  userResolution?: string
  attachments?: UploadFile[]
}
