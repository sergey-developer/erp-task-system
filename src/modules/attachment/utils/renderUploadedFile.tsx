import { UploadProps } from 'antd'
import React from 'react'

import UploadedAttachment from 'modules/attachment/components/UploadedAttachment'

export const renderUploadedFile: UploadProps['itemRender'] = (originNode, file) =>
  file.error ? null : file.status === 'uploading' ? (
    originNode
  ) : file.response ? (
    <UploadedAttachment
      id={file.uid}
      url={file.response.url}
      name={file.response.title}
      size={file.response.size}
    />
  ) : null
