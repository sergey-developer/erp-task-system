import { RcFile } from 'antd/es/upload'

import { IdType } from './common'

export type FileToUpload = RcFile
export type FileResponse = Partial<{ id: IdType }>
