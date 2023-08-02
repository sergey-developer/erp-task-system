import { Space, Typography } from 'antd'
import React, { FC } from 'react'

import AttachmentList from 'modules/task/components/AttachmentList'
import { useTaskType } from 'modules/task/hooks'
import { TaskModel } from 'modules/task/models'

import LabeledData from 'components/LabeledData'

import { commonEllipsisConfig } from 'shared/constants/text'
import { renderStringWithLineBreak } from 'shared/utils/string'

const { Title, Paragraph } = Typography

export type ResolutionTabProps = Pick<
  TaskModel,
  'techResolution' | 'userResolution' | 'type'
> & {
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

        {!!attachments.length && <AttachmentList attachments={attachments} />}
      </Space>

      {!!techResolution && (
        <LabeledData label='Техническое решение'>
          <Paragraph ellipsis={commonEllipsisConfig}>
            {renderStringWithLineBreak(techResolution)}
          </Paragraph>
        </LabeledData>
      )}

      {!!userResolution && !taskType.isIncidentTask && !taskType.isRequestTask && (
        <LabeledData label='Решение для пользователя'>
          <Paragraph ellipsis={commonEllipsisConfig}>
            {renderStringWithLineBreak(userResolution)}
          </Paragraph>
        </LabeledData>
      )}

      {!techResolution && !userResolution && '-'}
    </Space>
  )
}

export default ResolutionTab
