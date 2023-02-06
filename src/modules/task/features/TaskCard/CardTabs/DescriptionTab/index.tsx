import { Typography } from 'antd'
import React, { FC } from 'react'

import Space from 'components/Space'
import { TaskModel } from 'modules/task/models'
import { renderStringWithLineBreak } from 'shared/utils/string'

const { Title, Paragraph } = Typography

export type DescriptionTabProps = Pick<TaskModel, 'description'> & {
  title: string
}

const DescriptionTab: FC<DescriptionTabProps> = ({ title, description }) => {
  return (
    <Space data-testid='task-description-tab' $block direction='vertical'>
      <Title level={5}>{title}</Title>

      {description && (
        <Paragraph>{renderStringWithLineBreak(description)}</Paragraph>
      )}
    </Space>
  )
}

export default DescriptionTab
