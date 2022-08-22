import { Space, Typography } from 'antd'
import React from 'react'

import { FCWithChildren } from 'shared/interfaces/utils'

const { Text } = Typography

type LabeledFieldProps = { label: string }

const LabeledField: FCWithChildren<LabeledFieldProps> = ({
  children,
  label,
}) => {
  return (
    <Space direction='vertical'>
      <Text type='secondary'>{label}</Text>

      {children}
    </Space>
  )
}

export default LabeledField
