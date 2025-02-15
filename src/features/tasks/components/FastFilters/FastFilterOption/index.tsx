import { Space, Typography } from 'antd'
import { CheckableTagProps } from 'antd/es/tag/CheckableTag'
import isNumber from 'lodash/isNumber'
import React from 'react'

import Spinner from 'components/Spinner'

import { CheckableTagStyled } from './styles'

const { Text } = Typography

export type FastFilterOptionProps<Value = string> = Pick<
  CheckableTagProps,
  'checked' | 'onChange'
> & {
  label: string
  value: Value
  counter?: number
  loading?: boolean
  disabled?: boolean
}

const FastFilterOption = <Value,>({
  label,
  value,
  counter,

  checked,
  onChange,

  loading = false,
  disabled = false,
}: FastFilterOptionProps<Value>) => {
  return (
    <div data-testid='fast-filters-option'>
      <CheckableTagStyled
        data-testid={`checkable-tag-${value}`}
        className={disabled ? 'ant-tag-checkable--disabled' : undefined}
        checked={disabled ? false : checked}
        onChange={disabled ? undefined : onChange}
      >
        <Space>
          {label}

          {loading ? (
            <Spinner data-testid='fast-filters-option-counter-loading' />
          ) : (
            isNumber(counter) && <Text type='secondary'>{counter}</Text>
          )}
        </Space>
      </CheckableTagStyled>
    </div>
  )
}

export default FastFilterOption
