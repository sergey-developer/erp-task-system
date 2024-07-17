import { Col, ColProps, Row, RowProps, Typography } from 'antd'
import React, { FC, ReactNode } from 'react'

const { Text } = Typography

export type ReadonlyFieldProps = {
  label: string
  value: any
  displayValue?: ReactNode
  forceDisplayValue?: boolean
  rowProps?: RowProps
  leftColProps?: ColProps
  rightColProps?: ColProps
}

// todo: переиспользовать где возможно
const ReadonlyField: FC<ReadonlyFieldProps> = ({
  value,
  displayValue = value,
  forceDisplayValue = false,
  label,
  rowProps,
  leftColProps,
  rightColProps,
  ...props
}) => {
  return (
    <Row {...props} {...rowProps} align={rowProps?.align ? rowProps.align : 'middle'}>
      <Col span={8} {...leftColProps}>
        <Text type='secondary'>{label}</Text>
      </Col>

      {forceDisplayValue ? (
        <Col span={16} {...rightColProps}>
          {displayValue}
        </Col>
      ) : (
        value && (
          <Col span={16} {...rightColProps}>
            {displayValue}
          </Col>
        )
      )}
    </Row>
  )
}

export default ReadonlyField
