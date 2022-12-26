import { Typography } from 'antd'
import React, { FC } from 'react'

import Space from 'components/Space'
import { TaskModel } from 'modules/task/models'

const { Title, Paragraph } = Typography

export type DescriptionTabProps = Pick<TaskModel, 'description'> & {
  title: string
}

const DescriptionTab: FC<DescriptionTabProps> = ({ title, description }) => {
  return (
    <Space data-testid='task-description-tab' $block direction='vertical'>
      <Title level={5}>{title}</Title>

      {description && <Paragraph>{description}</Paragraph>}
    </Space>
  )
}

export default DescriptionTab
