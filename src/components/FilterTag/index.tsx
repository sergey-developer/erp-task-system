import { Skeleton, Space, Typography } from 'antd'
import React, { FC } from 'react'

import { CheckableTagProps } from 'antd/lib/tag/CheckableTag'
import { MaybeNull } from 'shared/interfaces/utils'
import isNumber from 'shared/utils/number/isNumber'

import { CheckableTagStyled } from './styles'

const { Text } = Typography

export type FilterTagProps = CheckableTagProps & {
  text: string
  amount: MaybeNull<number>
  loading?: boolean
}

const FilterTag: FC<FilterTagProps> = ({
  checked,
  onChange,
  text,
  amount,
  loading,
}) => {
  return loading ? (
    <Skeleton.Button active={loading} size='small' shape='round' />
  ) : (
    <CheckableTagStyled checked={checked} onChange={onChange}>
      <Space>
        {text}

        {isNumber(amount) && <Text type='secondary'>{amount}</Text>}
      </Space>
    </CheckableTagStyled>
  )
}

export default FilterTag
