import { UploadFile } from 'antd/lib/upload/interface'

export type TaskResolutionFormFields = {
  techResolution: string
  userResolution?: string
  attachments?: Array<
    Pick<
      UploadFile,
      | 'uid'
      | 'type'
      | 'size'
      | 'percent'
      | 'originFileObj'
      | 'name'
      | 'lastModified'
      | 'lastModifiedDate'
    >
  >
}
