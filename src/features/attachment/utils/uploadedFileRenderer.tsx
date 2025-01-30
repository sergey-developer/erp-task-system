import { UploadProps } from 'antd'
import { UploadFile } from 'antd/es/upload'
import React from 'react'

import UploadedAttachment from 'features/attachment/components/UploadedAttachment'
import { UserModel } from 'features/user/models'

import { FileResponse } from 'shared/types/file'

type GetFileAttrsResult = {
  name: string
  url?: string
  size?: number
  createdAt?: string
  createdBy?: Pick<UserModel, 'firstName' | 'lastName' | 'middleName'>
}

const getFileAttrs = (file: UploadFile<FileResponse>): GetFileAttrsResult => ({
  url: file.response?.url || file.url || file.thumbUrl,
  name: file.response?.title || file.name,
  size: file.response?.size || file.size,
  createdAt: file.response?.createdAt,
  createdBy: file.response?.createdBy,
})

export const renderUploadedFile =
  (params?: { canDelete?: boolean; showDelete?: boolean }): UploadProps['itemRender'] =>
  (originNode, file, fileList, actions) => {
    const attrs = getFileAttrs(file)

    return file.error ? null : file.status === 'uploading' ? (
      originNode
    ) : attrs.url && attrs.name ? (
      <UploadedAttachment
        key={file.uid}
        id={file.uid}
        {...attrs}
        {...attrs.createdBy}
        {...actions}
        {...params}
      />
    ) : (
      originNode
    )
  }
// todo: объединить логику 2х фун-ций в одну
export const renderUploadedReadonlyFile: UploadProps['itemRender'] = (originNode, file) => {
  const attrs = getFileAttrs(file)

  return file.error ? null : file.status === 'uploading' ? (
    originNode
  ) : attrs.url && attrs.name ? (
    <UploadedAttachment key={file.uid} id={file.uid} {...attrs} />
  ) : (
    originNode
  )
}
