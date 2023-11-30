import { UploadFile } from 'antd/es/upload'

import { FileToSend } from 'shared/types/file'
import { MaybeUndefined } from 'shared/types/utils'
import { isTruthy } from 'shared/utils/common'

const extractOriginFile = (file: UploadFile): MaybeUndefined<FileToSend> => file.originFileObj

export const extractOriginFiles = (files: UploadFile[]): FileToSend[] =>
  files.map(extractOriginFile).filter(isTruthy)
