import { Space, Tabs, Typography } from 'antd'
import React, { FC, useCallback, useMemo } from 'react'

import { TaskTypeEnum } from 'modules/tasks/constants'
import {
  TaskDetailsCommentModel,
  TaskDetailsModel,
} from 'modules/tasks/taskView/models'
import getShortUserName from 'modules/user/utils/getShortUserName'
import { NO_CONTENT_HYPHEN } from 'shared/constants/common'
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

  const renderTaskComments = useCallback(() => {
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

          <Paragraph
            ellipsis={
              description
                ? {
                    rows: 5,
                    expandable: true,
                    symbol: 'Читать полностью',
                  }
                : false
            }
          >
            {description || NO_CONTENT_HYPHEN}
          </Paragraph>

          <Title level={5}>Комментарии</Title>

          {renderTaskComments()}
        </TabPane>

        <TabPane tab='Решение' key={TaskDetailsTabsEnum.Resolution}>
          <Title level={5}>Решение</Title>

          {showResolution ? (
            <>
              {techResolutionContent}
              {userResolutionContent}
            </>
          ) : (
            NO_CONTENT_HYPHEN
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
