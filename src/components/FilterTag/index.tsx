import { Space, Typography } from 'antd'
import { CheckableTagProps } from 'antd/lib/tag/CheckableTag'
import React, { FC } from 'react'

import { CheckableTagStyled } from './styles'

const { Text } = Typography

export type FilterTagProps = CheckableTagProps & {
  text: string
  amount: number
}

const FilterTag: FC<FilterTagProps> = ({ checked, onChange, text, amount }) => {
  return (
    // Tag.CheckableTag имеет тип React.FC который не принимает children
    // @ts-ignore
    <CheckableTagStyled checked={checked} onChange={onChange}>
      <Space>
        {text}
        <Text type='secondary'>{amount}</Text>
      </Space>
    </CheckableTagStyled>
  )
}

export default FilterTag
