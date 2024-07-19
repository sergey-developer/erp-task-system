import { Col, ColProps, Row, RowProps, Typography } from 'antd'
import isNumber from 'lodash/isNumber'
import isString from 'lodash/isString'
import React, { FC, ReactNode } from 'react'

const { Text } = Typography

export type ReadonlyFieldProps = Pick<RowProps, 'align'> & {
  label: string
  value: any
  displayValue?: ReactNode
  forceDisplayValue?: boolean
  leftColProps?: ColProps
  rightColProps?: ColProps
}

// todo: переиспользовать где возможно
const ReadonlyField: FC<ReadonlyFieldProps> = ({
  value,
  displayValue = value,
  forceDisplayValue = false,
  label,
  align = 'middle',
  leftColProps,
  rightColProps,
  ...props
}) => {
  const valueComponent = (
    <Col span={16} {...rightColProps}>
      {isString(displayValue) || isNumber(displayValue) ? (
        <Text>{displayValue}</Text>
      ) : (
        displayValue
      )}
    </Col>
  )

  return (
    <Row {...props}>
      <Col span={8} {...leftColProps}>
        <Text type='secondary'>{label}</Text>
      </Col>

      {forceDisplayValue ? valueComponent : !!value && valueComponent}
    </Row>
  )
}

export default ReadonlyField
