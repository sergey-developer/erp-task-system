import { UploadFile } from 'antd/es/upload'

import { IdType } from './common'

export type FileToSend = NonNullable<UploadFile['originFileObj']>
export type FileResponse = Partial<{ id: IdType }>
