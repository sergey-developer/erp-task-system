import { UploadFile } from 'shared/interfaces/file'

export type TaskResolutionFormFields = {
  techResolution: string
  userResolution?: string
  attachments?: Array<UploadFile>
}
