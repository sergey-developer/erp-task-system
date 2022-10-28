import { Skeleton, Space, Typography } from 'antd'
import { CheckableTagProps } from 'antd/es/tag/CheckableTag'
import isNumber from 'lodash/isNumber'
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
  return (
    <div data-testid='filter-tag'>
      {loading ? (
        <Skeleton.Button active={loading} size='small' shape='round' />
      ) : (
        <CheckableTagStyled
          data-testid='checkable-tag'
          className={disabled ? 'ant-tag-checkable--disabled' : undefined}
          checked={disabled ? false : checked}
          onChange={disabled ? undefined : onChange}
        >
          <Space>
            {text}

            {isNumber(amount) && <Text type='secondary'>{amount}</Text>}
          </Space>
        </CheckableTagStyled>
      )}
    </div>
  )
}

export default FilterTag
