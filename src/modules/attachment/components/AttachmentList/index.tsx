import { Image, Space, Typography } from 'antd'
import { FC } from 'react'

import { AttachmentListModel } from 'modules/attachment/models'

const { Text } = Typography

export type AttachmentListProps = {
  data: AttachmentListModel

  imgWidth?: number
  imgHeight?: number
}

const AttachmentList: FC<AttachmentListProps> = ({
  data,
  imgWidth = 100,
  imgHeight = 100,
  ...props
}) => {
  return (
    <Space {...props} wrap>
      {data.length ? (
        data.map((item) => (
          <Image
            key={item.id}
            src={item.thumbnails.mediumThumbnail}
            preview={{ src: item.url, movable: false }}
            width={imgWidth}
            height={imgHeight}
          />
        ))
      ) : (
        <Text>Изображений нет</Text>
      )}
    </Space>
  )
}

export default AttachmentList
