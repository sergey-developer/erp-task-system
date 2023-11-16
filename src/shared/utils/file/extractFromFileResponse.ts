import { UploadFile } from 'antd/es/upload'

import { IdType } from 'shared/types/common'
import { isTruthy } from 'shared/utils/common'

export const extractIdsFromFilesResponse = (files: UploadFile<{ id: IdType }>[]): IdType[] =>
  files.map((f) => f.response?.id).filter(isTruthy)
