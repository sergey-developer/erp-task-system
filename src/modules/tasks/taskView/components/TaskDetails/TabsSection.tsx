import { Space, Tabs, Typography } from 'antd'
import React, { FC, useCallback, useMemo } from 'react'

import { TaskTypeEnum } from 'modules/tasks/constants'
import { TaskDetailsModel } from 'modules/tasks/taskView/models'
import { DATE_TIME_FORMAT } from 'shared/constants/dateTime'
import formatDate from 'shared/utils/date/formatDate'

import getUserName from '../../../../user/utils/getUserName'
import { DetailContainerStyled } from './styles'
import TaskComment from './TaskComment'

const { TabPane } = Tabs
const { Title, Text, Paragraph } = Typography

export type TabsSectionProps = Pick<
  TaskDetailsModel,
  'techResolution' | 'userResolution' | 'type' | 'comments'
>

const TabsSection: FC<TabsSectionProps> = ({
  techResolution,
  userResolution,
  type,
  comments = [],
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
            author={getUserName(comment.author, 'short')}
            createdAt={formatDate(comment.createdAt, DATE_TIME_FORMAT)}
          />
        ))}
      </Space>
    )
  }, [comments])

  return (
    <DetailContainerStyled>
      <Tabs defaultActiveKey='1'>
        <TabPane tab='Описание и комментарии' key='1'>
          <Title level={5}>Описание</Title>

          <Paragraph
            ellipsis={{
              rows: 5,
              expandable: true,
              symbol: 'Читать полностью',
              onExpand: () => {
                console.log('TODO: open modal')
              },
            }}
          >
            Описание
          </Paragraph>

          <Title level={5}>Комментарии</Title>

          {renderTaskComments()}
        </TabPane>

        <TabPane tab='Решение' key='2'>
          <Title level={5}>Решение</Title>
          {showResolution ? (
            <>
              {techResolutionContent}
              {userResolutionContent}
            </>
          ) : (
            '-'
          )}
        </TabPane>

        <TabPane tab='Задания' key='3'>
          Задания
        </TabPane>
      </Tabs>
    </DetailContainerStyled>
  )
}

export default TabsSection
