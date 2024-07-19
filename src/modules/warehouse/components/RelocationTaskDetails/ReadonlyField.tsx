import { Col, ColProps, Row, RowProps, Typography } from 'antd'
import isNumber from 'lodash/isNumber'
import isString from 'lodash/isString'
import React, { FC, ReactNode } from 'react'

import { WithTestIdType } from 'shared/types/common'

const { Text } = Typography

export type ReadonlyFieldProps = WithTestIdType & {
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
  const Value = (
    <Col span={16} {...rightColProps}>
      {isString(displayValue) || isNumber(displayValue) ? (
        <Text>{displayValue}</Text>
      ) : (
        displayValue
      )}
    </Col>
  )

  return (
    <Row {...props} {...rowProps} align={rowProps?.align ? rowProps.align : 'middle'}>
      <Col span={8} {...leftColProps}>
        <Text type='secondary'>{label}</Text>
      </Col>

      {forceDisplayValue ? Value : !!value && Value}
    </Row>
  )
}

export default ReadonlyField
