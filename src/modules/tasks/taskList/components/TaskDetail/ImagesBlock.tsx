import { Space } from 'antd'
import React, { FC } from 'react'

import { ImageStyled } from './styles'

type ImagesBlockType = {
  images: string[]
}
const ImagesBlock: FC<ImagesBlockType> = ({ images }) => {
  return (
    <Space>
      {images.map((image) => (
        <ImageStyled key={image} src={image} />
      ))}
    </Space>
  )
}

export default ImagesBlock
