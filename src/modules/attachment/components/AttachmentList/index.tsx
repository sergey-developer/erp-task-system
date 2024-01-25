import { Image, Space, Typography } from 'antd'
import { FC } from 'react'

import { AttachmentListProps } from './types'

const { Text } = Typography

const AttachmentList: FC<AttachmentListProps> = ({
  data,
  imgWidth = 100,
  imgHeight = 100,
  ...props
}) => {
  return (
    <Space {...props} wrap>
      {data.length ? (
        data.map((item, index) => (
          <Image
            key={index}
            alt={item.name}
            src={item.thumbnails?.mediumThumbnail}
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
