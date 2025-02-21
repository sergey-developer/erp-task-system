import { UploadFile } from 'antd/es/upload'

import { IdType } from 'shared/types/common'
import { FileResponse } from 'shared/types/file'
import { isTruthy } from 'shared/utils/common'

// todo: написать тесты
export const extractIdsFromFilesResponse = (files: UploadFile<FileResponse>[]): IdType[] =>
  files.map((f) => f.response?.id).filter(isTruthy)
