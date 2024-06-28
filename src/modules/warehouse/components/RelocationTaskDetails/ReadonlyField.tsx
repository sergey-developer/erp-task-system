import { Col, ColProps, Row, RowProps, Typography } from 'antd'
import React, { FC, ReactNode } from 'react'

const { Text } = Typography

export type ReadonlyFieldProps = Pick<RowProps, 'align'> & {
  label: string
  value: any
  displayValue?: ReactNode
  forceDisplayValue?: boolean
  leftColProps?: ColProps
}

// todo: переиспользовать где возможно
const ReadonlyField: FC<ReadonlyFieldProps> = ({
  value,
  displayValue = value,
  forceDisplayValue = false,
  label,
  align = 'middle',
  leftColProps,
  ...props
}) => {
  return (
    <Row {...props}>
      <Col span={8} {...leftColProps}>
        <Text type='secondary'>{label}</Text>
      </Col>

      {forceDisplayValue ? (
        <Col span={16}>{displayValue}</Col>
      ) : (
        value && <Col span={16}>{displayValue}</Col>
      )}
    </Row>
  )
}

export default ReadonlyField
