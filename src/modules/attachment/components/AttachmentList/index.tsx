import { Image, Space } from 'antd'
import { FC } from 'react'

import { AttachmentListModel } from 'modules/attachment/models'

export type AttachmentListProps = {
  data: AttachmentListModel

  width?: number
  height?: number
}

const AttachmentList: FC<AttachmentListProps> = ({ data, width = 100, height = 100, ...props }) => {
  return (
    <Space {...props} wrap>
      {data.map((item) => (
        <Image
          key={item.id}
          src={item.thumbnails.mediumThumbnail}
          preview={{ src: item.url, movable: false }}
          width={width}
          height={height}
        />
      ))}
    </Space>
  )
}

export default AttachmentList
