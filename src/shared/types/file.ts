import { RcFile } from 'antd/es/upload'

import { IdType } from './common'

export type FileToSend = RcFile
export type FileResponse = Partial<{ id: IdType }>
