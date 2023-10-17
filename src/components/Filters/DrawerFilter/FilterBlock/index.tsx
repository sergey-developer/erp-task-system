import { Button, Typography } from 'antd'
import React from 'react'

import Space from 'components/Space'

import { FCWithChildren } from 'shared/types/utils'

import { WrapperStyled } from './styles'

const { Title, Text } = Typography

export type FilterBlockProps = {
  label: string
  onReset: () => void
}

const FilterBlock: FCWithChildren<FilterBlockProps> = ({ children, onReset, label, ...props }) => {
  return (
    <WrapperStyled {...props}>
      <Space $block direction='vertical' size={30}>
        <Space align='baseline' size={12}>
          <Title level={4}>{label}</Title>

          <Button onClick={onReset} type='text'>
            <Text type='secondary'>Сбросить</Text>
          </Button>
        </Space>

        {children}
      </Space>
    </WrapperStyled>
  )
}

export default FilterBlock
