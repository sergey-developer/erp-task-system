import { SpaceProps, Typography } from 'antd'
import React from 'react'

import Space from 'components/Space'

import { FCWithChildren } from 'shared/types/utils'

const { Text } = Typography

type LabeledDataProps = Pick<SpaceProps, 'size' | 'direction' | 'align' | 'onClick'> & {
  label: string
  labelPosition?: 'left' | 'right'
  block?: boolean
}

const LabeledData: FCWithChildren<LabeledDataProps> = ({
  children,
  label,
  labelPosition = 'left',
  direction = 'vertical',
  block = true,
  ...props
}) => {
  const labelComponent = <Text type='secondary'>{label}</Text>

  return (
    <Space direction={direction} $block={block} {...props}>
      {labelPosition === 'left' && labelComponent}
      {children}
      {labelPosition === 'right' && labelComponent}
    </Space>
  )
}

export default LabeledData
