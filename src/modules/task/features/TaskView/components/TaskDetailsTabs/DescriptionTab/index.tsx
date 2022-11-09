import { Space, Typography } from 'antd'
import React, { FC } from 'react'

import { TaskDetailsModel } from 'modules/task/features/TaskView/models'

const { Title, Paragraph } = Typography

export type DescriptionTabProps = Pick<TaskDetailsModel, 'description'> & {
  title: string
}

const DescriptionTab: FC<DescriptionTabProps> = ({ title, description }) => {
  return (
    <Space data-testid='task-description-tab' direction='vertical'>
      <Title level={5}>{title}</Title>

      {description && <Paragraph>{description}</Paragraph>}
    </Space>
  )
}

export default DescriptionTab
