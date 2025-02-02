import { Space, Typography } from 'antd'
import Attachments from 'features/attachments/components/Attachments'
import { useTaskType } from 'features/task/hooks/task'
import { TaskModel } from 'features/task/models'
import React, { FC } from 'react'

import Label from 'components/Label'

import { commonEllipsisConfig } from 'shared/constants/common'
import { renderStringWithLineBreak } from 'shared/utils/string'

const { Title, Paragraph } = Typography

export type ResolutionTabProps = Pick<TaskModel, 'techResolution' | 'userResolution' | 'type'> & {
  title: string
  attachments: TaskModel['resolution']['attachments']
}

const ResolutionTab: FC<ResolutionTabProps> = ({
  type,
  title,
  userResolution,
  techResolution,
  attachments,
}) => {
  const taskType = useTaskType(type)

  return (
    <Space data-testid='task-resolution-tab' direction='vertical' size='large'>
      <Space direction='vertical'>
        <Title level={5}>{title}</Title>

        {!!attachments.length && <Attachments data={attachments} />}
      </Space>

      {!!techResolution && (
        <Label label='Техническое решение'>
          <Paragraph ellipsis={commonEllipsisConfig}>
            {renderStringWithLineBreak(techResolution)}
          </Paragraph>
        </Label>
      )}

      {!!userResolution && !taskType.isIncidentTask && !taskType.isRequestTask && (
        <Label label='Решение для пользователя'>
          <Paragraph ellipsis={commonEllipsisConfig}>
            {renderStringWithLineBreak(userResolution)}
          </Paragraph>
        </Label>
      )}

      {!techResolution && !userResolution && '-'}
    </Space>
  )
}

export default ResolutionTab
