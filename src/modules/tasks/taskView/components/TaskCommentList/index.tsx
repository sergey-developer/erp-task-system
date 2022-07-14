import { useBoolean } from 'ahooks'
import { Button, Space, Typography } from 'antd'
import React, { FC } from 'react'

import TaskComment from './TaskComment'

const { Text } = Typography

type ListItem = {
  id: number
  text: string
  author: string
  createdAt: string
}

type TaskCommentListProps = {
  list: Array<ListItem>
  defaultDisplayableCount?: number
}

const TaskCommentList: FC<TaskCommentListProps> = ({
  list,
  defaultDisplayableCount = list.length,
}) => {
  const [isShowAll, { setTrue: setShowAll }] = useBoolean(false)

  if (!list.length) {
    return <Text>Комментариев пока нет</Text>
  }

  const isDisplayableCountExceed: boolean =
    list.length > defaultDisplayableCount

  const displayableComments =
    isDisplayableCountExceed && isShowAll
      ? list
      : list.slice(0, defaultDisplayableCount)

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

      {isDisplayableCountExceed && !isShowAll && (
        <Button type='link' onClick={setShowAll}>
          Показать все
        </Button>
      )}
    </Space>
  )
}

export default TaskCommentList
