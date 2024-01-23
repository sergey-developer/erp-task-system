import { UploadProps } from 'antd'
import { UploadFile } from 'antd/es/upload'
import React from 'react'

import UploadedAttachment from 'modules/attachment/components/UploadedAttachment'

type GetFileAttrsResult = {
  url: string
  name: string
  size: number
}

const getFileAttrs = (file: UploadFile): GetFileAttrsResult => ({
  url: file.response?.url || file.url || file.thumbUrl,
  name: file.response?.title || file.name,
  size: file.response?.size || file.size,
})

export const renderUploadedFile: UploadProps['itemRender'] = (
  originNode,
  file,
  fileList,
  actions,
) => {
  const attrs = getFileAttrs(file)

  return file.error ? null : file.status === 'uploading' ? (
    originNode
  ) : attrs.url && attrs.name ? (
    <UploadedAttachment id={file.uid} {...attrs} {...actions} />
  ) : (
    originNode
  )
}

export const renderUploadedReadonlyFile: UploadProps['itemRender'] = (originNode, file) => {
  const attrs = getFileAttrs(file)

  return file.error ? null : file.status === 'uploading' ? (
    originNode
  ) : attrs.url && attrs.name ? (
    <UploadedAttachment id={file.uid} {...attrs} />
  ) : (
    originNode
  )
}
