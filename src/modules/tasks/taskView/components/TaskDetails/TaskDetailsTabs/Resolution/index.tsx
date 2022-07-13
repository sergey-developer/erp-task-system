import { Typography } from 'antd'
import React, { FC } from 'react'

import useTaskType from 'modules/tasks/hooks/useTaskType'
import { TaskDetailsModel } from 'modules/tasks/taskView/models'

const { Title, Text, Paragraph } = Typography

type ResolutionProps = Pick<
  TaskDetailsModel,
  'type' | 'techResolution' | 'userResolution'
>

const Resolution: FC<ResolutionProps> = ({
  type,
  userResolution,
  techResolution,
}) => {
  const taskType = useTaskType(type)

  const techResolutionContent = techResolution ? (
    <>
      <Text type='secondary'>Техническое решение</Text>
      <Paragraph>{techResolution}</Paragraph>
    </>
  ) : null

  const userResolutionContent =
    userResolution && !taskType.isIncident && !taskType.isRequest ? (
      <>
        <Text type='secondary'>Решение для пользователя</Text>
        <Paragraph>{userResolution}</Paragraph>
      </>
    ) : null

  const isShowResolution = !!techResolutionContent || !!userResolutionContent

  return (
    <>
      <Title level={5}>Решение</Title>

      {isShowResolution ? (
        <>
          {techResolutionContent}
          {userResolutionContent}
        </>
      ) : (
        '—'
      )}
    </>
  )
}

export default Resolution
