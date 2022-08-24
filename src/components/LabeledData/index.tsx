import { Space, SpaceProps, Typography } from 'antd'
import React from 'react'

import { FCWithChildren } from 'shared/interfaces/utils'

const { Text } = Typography

type LabeledDataProps = Pick<SpaceProps, 'size' | 'direction'> & {
  label: string
}

const LabeledData: FCWithChildren<LabeledDataProps> = ({
  children,
  label,
  size,
  direction,
  ...props
}) => {
  return (
    <Space direction={direction} size={size} {...props}>
      <Text type='secondary'>{label}</Text>

      {children}
    </Space>
  )
}

LabeledData.defaultProps = {
  direction: 'vertical',
}

export default LabeledData
