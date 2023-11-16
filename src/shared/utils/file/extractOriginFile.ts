import { UploadFile } from 'antd/es/upload/interface'

import { FileToUpload } from 'shared/types/file'
import { MaybeUndefined } from 'shared/types/utils'
import { isTruthy } from 'shared/utils/common'

const extractOriginFile = (file: UploadFile): MaybeUndefined<FileToUpload> => file.originFileObj

export const extractOriginFiles = (files: UploadFile[]): FileToUpload[] =>
  files.map(extractOriginFile).filter(isTruthy)
