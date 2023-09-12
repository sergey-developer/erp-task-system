import { UploadFile } from 'shared/types/file'

export type TaskResolutionFormFields = {
  techResolution: string
  userResolution?: string
  attachments?: UploadFile[]
}
