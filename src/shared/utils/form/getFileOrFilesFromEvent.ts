import { UploadChangeParam } from 'antd/es/upload/interface'

export const getFilesFromEvent = (
  event: Pick<UploadChangeParam, 'file' | 'fileList'>,
) => event.fileList

export const getFileFromEvent = (
  event: Pick<UploadChangeParam, 'file' | 'fileList'>,
) => event.file
