import { UploadChangeParam } from 'antd/es/upload'

export const getFileFromEvent = (event: Pick<UploadChangeParam, 'file'>) => event.file
export const getFilesFromEvent = (event: Pick<UploadChangeParam, 'fileList'>) => event.fileList
