import { Space, Typography } from 'antd'
import React, { FC } from 'react'

import LabeledData from 'components/LabeledData'
import { useTaskType } from 'modules/task/hooks'
import { TaskDetailsModel } from 'modules/task/models'
import { commonEllipsisConfig } from 'shared/constants/text'
import { renderStringWithLineBreak } from 'shared/utils/string'

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
