import { UploadProps } from 'antd'
import React from 'react'

import UploadedAttachment from 'modules/attachment/components/UploadedAttachment'

export const renderUploadedFile: UploadProps['itemRender'] = (originNode, file) => {
  const url = file.response?.url || file.url || file.thumbUrl
  const name = file.response?.title || file.name
  const size = file.response?.size || file.size

  return file.error ? null : file.status === 'uploading' ? (
    originNode
  ) : url && name ? (
    <UploadedAttachment id={file.uid} url={url} name={name} size={size} />
  ) : (
    originNode
  )
}
