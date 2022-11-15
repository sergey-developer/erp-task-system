import { Typography } from 'antd'
import React, { FC } from 'react'

import Space, { SpaceProps } from 'components/Space'

const { Text } = Typography

type SeparatedTextProps = SpaceProps

const SeparatedText: FC<SeparatedTextProps> = ({ children, ...props }) => (
  <Space {...props}>{children}</Space>
)

SeparatedText.defaultProps = {
  size: 4,
  split: <Text type='secondary'>•</Text>,
}

export default SeparatedText
