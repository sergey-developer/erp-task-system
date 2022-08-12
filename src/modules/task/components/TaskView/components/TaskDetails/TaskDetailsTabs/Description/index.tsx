import { Space, Typography } from 'antd'
import React, { FC } from 'react'

import { TaskDetailsModel } from 'modules/task/components/TaskView/models'

const { Title, Paragraph } = Typography

type DescriptionProps = Pick<TaskDetailsModel, 'description'> & {
  title: string
}

const Description: FC<DescriptionProps> = ({ title, description }) => {
  return (
    <Space direction='vertical'>
      <Title level={5}>{title}</Title>

      {description && <Paragraph>{description}</Paragraph>}
    </Space>
  )
}

export default Description
