import { Image, Space, Typography } from 'antd'
import { FC } from 'react'

import { AttachmentListModel } from 'modules/attachment/models'
import { RelocationTaskAttachmentsModel } from 'modules/warehouse/models'

import { hasProperty } from 'shared/utils/common'

const { Text } = Typography

export type AttachmentListProps = {
  data: AttachmentListModel | RelocationTaskAttachmentsModel

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
        data.map((item, index) => (
          <Image
            key={index}
            src={
              // todo: попросить унифицировать контракт
              hasProperty(item, 'thumbnail')
                ? item.thumbnail || ''
                : item.thumbnails.mediumThumbnail
            }
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
