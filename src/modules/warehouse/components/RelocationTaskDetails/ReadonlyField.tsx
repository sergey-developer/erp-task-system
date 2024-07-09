import { Col, Row, RowProps, Typography } from 'antd'
import React, { FC, ReactNode } from 'react'

const { Text } = Typography

export type ReadonlyFieldProps = Pick<RowProps, 'align'> & {
  label: string
  value: any
  displayValue?: ReactNode
  forceDisplayValue?: boolean
}

// todo: переиспользовать где возможно
const ReadonlyField: FC<ReadonlyFieldProps> = ({
  value,
  displayValue = value,
  forceDisplayValue = false,
  label,
  align = 'middle',
  ...props
}) => {
  return (
    <Row {...props} align={align}>
      <Col span={8}>
        <Text type='secondary'>{label}</Text>
      </Col>

      {forceDisplayValue ? (
        <Col span={16}>
          <Text>{displayValue}</Text>
        </Col>
      ) : (
        value && (
          <Col span={16}>
            <Text>{displayValue}</Text>
          </Col>
        )
      )}
    </Row>
  )
}

export default ReadonlyField
