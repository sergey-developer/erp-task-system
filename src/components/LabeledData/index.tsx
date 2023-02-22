import { SpaceProps, Typography } from 'antd'
import React from 'react'

import Space from 'components/Space'

import { FCWithChildren } from 'shared/interfaces/utils'

const { Text } = Typography

type LabeledDataProps = Pick<SpaceProps, 'size' | 'direction' | 'align'> & {
  label: string
  block?: boolean
}

const LabeledData: FCWithChildren<LabeledDataProps> = ({
  children,
  label,
  direction,
  block,
  ...props
}) => {
  return (
    <Space direction={direction} $block={block} {...props}>
      <Text type='secondary'>{label}</Text>

      {children}
    </Space>
  )
}

LabeledData.defaultProps = {
  direction: 'vertical',
  block: true,
}

export default LabeledData
