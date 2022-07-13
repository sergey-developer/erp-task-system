import { useBoolean } from 'ahooks'
import { Button, Space, Spin, Typography } from 'antd'
import React, { FC, useMemo } from 'react'

import OpenableText from 'components/OpenableText'
import useGetTaskCommentList from 'modules/tasks/taskView/hooks/useGetTaskCommentList'
import { TaskDetailsModel } from 'modules/tasks/taskView/models'
import getShortUserName from 'modules/user/utils/getShortUserName'
import { DATE_TIME_FORMAT } from 'shared/constants/dateTime'
import formatDate from 'shared/utils/date/formatDate'

import TaskComment from './TaskComment'

const { Title, Text } = Typography
const DEFAULT_DISPLAYABLE_COMMENTS_COUNT: number = 3

type DescriptionAndCommentsTabProps = Pick<
  TaskDetailsModel,
  'id' | 'description'
>

const DescriptionAndComments: FC<DescriptionAndCommentsTabProps> = ({
  id: taskId,
  description,
}) => {
  const [isShowAllComments, { setTrue: setShowAllComments }] = useBoolean(false)
  const { data: commentList = [], isFetching: commentListIsFetching } =
    useGetTaskCommentList(taskId)

  const modifiedCommentList = useMemo(() => {
    return commentList.map((comment) => ({
      ...comment,
      author: getShortUserName(comment.author),
      createdAt: formatDate(comment.createdAt, DATE_TIME_FORMAT),
    }))
  }, [commentList])

  const commentListContent = useMemo(() => {
    if (!modifiedCommentList.length) {
      return <Text>Комментариев пока нет</Text>
    }

    const isMoreThanThreeComments: boolean =
      modifiedCommentList.length > DEFAULT_DISPLAYABLE_COMMENTS_COUNT

    const displayableComments =
      isShowAllComments && isMoreThanThreeComments
        ? modifiedCommentList
        : modifiedCommentList.slice(0, DEFAULT_DISPLAYABLE_COMMENTS_COUNT)

    return (
      <Space direction='vertical'>
        <Space size='large' direction='vertical'>
          {displayableComments.map((comment) => (
            <TaskComment
              key={comment.id}
              text={comment.text}
              author={comment.author}
              createdAt={comment.createdAt}
            />
          ))}
        </Space>

        {isMoreThanThreeComments && !isShowAllComments && (
          <Button type='link' onClick={setShowAllComments}>
            Показать все
          </Button>
        )}
      </Space>
    )
  }, [isShowAllComments, modifiedCommentList, setShowAllComments])

  return (
    <>
      <Title level={5}>Описание</Title>

      {description && (
        <OpenableText
          className='margin-b-15'
          text={description}
          modalTitle='Описание'
        />
      )}

      <Title level={5}>Комментарии</Title>

      {commentListIsFetching ? <Spin /> : commentListContent}
    </>
  )
}

export default DescriptionAndComments
