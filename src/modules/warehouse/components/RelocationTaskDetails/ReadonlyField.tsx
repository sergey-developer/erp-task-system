import { Col, Row, Typography } from 'antd'
import React, { FC, ReactNode } from 'react'

const { Text } = Typography

export type ReadonlyFieldProps = {
  label: string
  value: any
  displayValue?: ReactNode
}

const ReadonlyField: FC<ReadonlyFieldProps> = ({
  value,
  displayValue = value,
  label,
  ...props
}) => {
  return (
    <Row {...props} align='middle'>
      <Col span={8}>
        <Text type='secondary'>{label}</Text>
      </Col>

      {value && <Col span={16}>{displayValue}</Col>}
    </Row>
  )
}

export default ReadonlyField
