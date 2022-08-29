import { Space } from 'antd'
import React, { FC } from 'react'

import { ImageStyled } from './styles'

type ImagesBlockProps = {
  images: string[]
}

const ImagesBlock: FC<ImagesBlockProps> = ({ images }) => {
  return (
    <Space>
      {images.map((image) => (
        <ImageStyled key={image} src={image} />
      ))}
    </Space>
  )
}

export default ImagesBlock
