import { Button, Space, Typography } from 'antd'
import React, { FC } from 'react'

const { Title, Text } = Typography

export type FilterBlockLabelProps = {
  label: string
  onReset: () => void
}

const FilterBlockLabel: FC<FilterBlockLabelProps> = ({ label, onReset }) => {
  return (
    <Space data-testid='filter-block-label' align='baseline' size={12}>
      <Title level={4}>{label}</Title>

      <Button onClick={onReset} type='text'>
        <Text type='secondary'>Сбросить</Text>
      </Button>
    </Space>
  )
}

export default FilterBlockLabel
