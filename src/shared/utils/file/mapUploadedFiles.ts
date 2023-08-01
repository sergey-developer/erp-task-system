import { RcFile } from 'antd/es/upload'
import { UploadFile } from 'antd/es/upload/interface'

import { truthy } from 'shared/utils/common'

export const mapUploadedFiles = (files: Array<UploadFile>): Array<RcFile> =>
  files.map((file) => file.originFileObj).filter(truthy)
