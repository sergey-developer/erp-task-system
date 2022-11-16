import { Space, Typography } from 'antd'
import React, { FC } from 'react'

import LabeledData from 'components/LabeledData'
import { TaskDetailsModel } from 'modules/task/features/TaskView/models'
import useTaskType from 'modules/task/hooks/useTaskType'
import { commonEllipsisConfig } from 'shared/constants/text'

const { Title, Paragraph } = Typography

export type ResolutionTabProps = Pick<
  TaskDetailsModel,
  'techResolution' | 'userResolution' | 'type'
> & {
  title: string
}

const ResolutionTab: FC<ResolutionTabProps> = ({
  type,
  title,
  userResolution,
  techResolution,
}) => {
  const taskType = useTaskType(type)

  return (
    <Space data-testid='task-resolution-tab' direction='vertical' size='large'>
      <Title level={5}>{title}</Title>

      {!!techResolution && (
        <LabeledData label='Техническое решение'>
          <Paragraph ellipsis={commonEllipsisConfig}>
            {techResolution}
          </Paragraph>
        </LabeledData>
      )}

      {!!userResolution && !taskType.isIncidentTask && !taskType.isRequestTask && (
        <LabeledData label='Решение для пользователя'>
          <Paragraph ellipsis={commonEllipsisConfig}>
            {userResolution}
          </Paragraph>
        </LabeledData>
      )}

      {!techResolution && !userResolution && '-'}
    </Space>
  )
}

export default ResolutionTab
