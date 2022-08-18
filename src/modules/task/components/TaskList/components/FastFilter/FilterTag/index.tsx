import { Skeleton, Space, Typography } from 'antd'
import { CheckableTagProps } from 'antd/es/tag/CheckableTag'
import _isNumber from 'lodash/isNumber'
import React, { FC } from 'react'

import { MaybeNull } from 'shared/interfaces/utils'

import { CheckableTagStyled } from './styles'

const { Text } = Typography

export type FilterTagProps = CheckableTagProps & {
  text: string
  amount: MaybeNull<number>
  loading?: boolean
  disabled?: boolean
}

const FilterTag: FC<FilterTagProps> = ({
  checked,
  onChange,
  text,
  amount,
  loading,
  disabled,
}) => {
  return loading ? (
    <Skeleton.Button active={loading} size='small' shape='round' />
  ) : (
    <CheckableTagStyled
      checked={checked}
      onChange={onChange}
      $disabled={disabled}
    >
      <Space>
        {text}

        {_isNumber(amount) && <Text type='secondary'>{amount}</Text>}
      </Space>
    </CheckableTagStyled>
  )
}

export default FilterTag
