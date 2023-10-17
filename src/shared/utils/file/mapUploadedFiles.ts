import { RcFile } from 'antd/es/upload'
import { UploadFile } from 'antd/es/upload/interface'

import { isTruthy } from 'shared/utils/common'

export const mapUploadedFiles = (files: UploadFile[]): RcFile[] =>
  files.map((file) => file.originFileObj).filter(isTruthy)
