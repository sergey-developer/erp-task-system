import { SpaceProps, Typography } from 'antd'
import React from 'react'

import Space from 'components/Space'

import { FCWithChildren } from 'shared/types/utils'

const { Text } = Typography

type LabeledDataProps = Pick<SpaceProps, 'size' | 'direction' | 'align' | 'onClick'> & {
  label: string
  block?: boolean
}

const LabeledData: FCWithChildren<LabeledDataProps> = ({
  children,
  label,
  direction = 'vertical',
  block = true,
  ...props
}) => {
  return (
    <Space direction={direction} $block={block} {...props}>
      <Text type='secondary'>{label}</Text>

      {children}
    </Space>
  )
}

export default LabeledData
