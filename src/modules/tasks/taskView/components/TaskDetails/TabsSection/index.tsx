import { Space, Tabs, Typography } from 'antd'
import React, { FC, useMemo } from 'react'

import OpenableText from 'components/OpenableText'
import { TaskTypeEnum } from 'modules/tasks/constants'
import {
  TaskDetailsCommentModel,
  TaskDetailsModel,
} from 'modules/tasks/taskView/models'
import getShortUserName from 'modules/user/utils/getShortUserName'
import { DATE_TIME_FORMAT } from 'shared/constants/dateTime'
import formatDate from 'shared/utils/date/formatDate'

import { DetailContainerStyled } from '../styles'
import { TaskDetailsTabsEnum } from './constants'
import TaskComment from './TaskComment'

const { TabPane } = Tabs
const { Title, Text, Paragraph } = Typography

export type TabsSectionProps = Pick<
  TaskDetailsModel,
  'techResolution' | 'userResolution' | 'type' | 'description'
> & {
  comments: Array<TaskDetailsCommentModel>
}

const TabsSection: FC<TabsSectionProps> = ({
  techResolution,
  userResolution,
  type,
  comments,
  description,
}) => {
  const techResolutionContent = useMemo(() => {
    return techResolution ? (
      <>
        <Text type='secondary'>Техническое решение</Text>
        <Paragraph>{techResolution}</Paragraph>
      </>
    ) : null
  }, [techResolution])

  const userResolutionContent = useMemo(() => {
    return userResolution &&
      type !== TaskTypeEnum.Incident &&
      type !== TaskTypeEnum.Request ? (
      <>
        <Text type='secondary'>Решение для пользователя</Text>
        <Paragraph>{userResolution}</Paragraph>
      </>
    ) : null
  }, [type, userResolution])

  const showResolution = !!techResolutionContent || !!userResolutionContent

  const taskComments = useMemo(() => {
    if (!comments.length) {
      return <Paragraph>Комментариев пока нет</Paragraph>
    }

    return (
      <Space size='large'>
        {comments.map((comment) => (
          <TaskComment
            key={comment.id}
            text={comment.text}
            author={getShortUserName(comment.author)}
            createdAt={formatDate(comment.createdAt, DATE_TIME_FORMAT)}
          />
        ))}
      </Space>
    )
  }, [comments])

  return (
    <DetailContainerStyled>
      <Tabs defaultActiveKey={TaskDetailsTabsEnum.DescriptionAndComments}>
        <TabPane
          tab='Описание и комментарии'
          key={TaskDetailsTabsEnum.DescriptionAndComments}
        >
          <Title level={5}>Описание</Title>

          {description && (
            <OpenableText
              className='margin-b-15'
              text={description}
              modalTitle='Описание'
            />
          )}

          <Title level={5}>Комментарии</Title>

          {taskComments}
        </TabPane>

        <TabPane tab='Решение' key={TaskDetailsTabsEnum.Resolution}>
          <Title level={5}>Решение</Title>

          {showResolution ? (
            <>
              {techResolutionContent}
              {userResolutionContent}
            </>
          ) : (
            '—'
          )}
        </TabPane>

        <TabPane tab='Задания' key={TaskDetailsTabsEnum.Tasks}>
          Задания
        </TabPane>
      </Tabs>
    </DetailContainerStyled>
  )
}

TabsSection.defaultProps = {
  comments: [],
}

export default TabsSection
