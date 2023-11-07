import { FileToSend, UploadFile } from 'shared/types/file'
import { isTruthy } from 'shared/utils/common'

export const mapUploadedFiles = (files: UploadFile[]): FileToSend[] =>
  files.map((file) => file.originFileObj).filter(isTruthy)
