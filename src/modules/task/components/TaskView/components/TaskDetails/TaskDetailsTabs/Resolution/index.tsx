import { Space, Typography } from 'antd'
import React, { FC } from 'react'

import LabeledField from 'components/Fields/LabeledField'
import { TaskDetailsModel } from 'modules/task/components/TaskView/models'
import useTaskType from 'modules/task/hooks/useTaskType'

const { Title, Paragraph } = Typography

type ResolutionProps = Pick<
  TaskDetailsModel,
  'type' | 'techResolution' | 'userResolution'
> & {
  title: string
}

const Resolution: FC<ResolutionProps> = ({
  type,
  title,
  userResolution,
  techResolution,
}) => {
  const taskType = useTaskType(type)

  return (
    <Space direction='vertical' size='large'>
      <Title level={5}>{title}</Title>

      {!!techResolution && (
        <LabeledField label='Техническое решение'>
          <Paragraph>{techResolution}</Paragraph>
        </LabeledField>
      )}

      {!!(
        userResolution &&
        !taskType.isIncidentTask &&
        !taskType.isRequestTask
      ) && (
        <LabeledField label='Решение для пользователя'>
          <Paragraph>{userResolution}</Paragraph>
        </LabeledField>
      )}

      {!techResolution && !userResolution && '—'}
    </Space>
  )
}

export default Resolution
