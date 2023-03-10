import { Typography } from 'antd'
import React, { FC } from 'react'

import { TaskModel } from 'modules/task/models'
import { UserModel } from 'modules/user/models'
import { getUserAbbr } from 'modules/user/utils'

import UserAvatar from 'components/Avatars/UserAvatar'
import Space from 'components/Space'

import { MaybeNull } from 'shared/interfaces/utils'

const { Text } = Typography

type TaskAssigneeProps = {
  name: string
  assignee: MaybeNull<Pick<UserModel, 'firstName' | 'lastName' | 'avatar'>>
  phone?: TaskModel['contactPhone']
}

const TaskAssignee: FC<TaskAssigneeProps> = ({ assignee, name, phone }) => {
  return (
    <Space data-testid='task-assignee' size='middle' align='start'>
      {assignee && (
        <UserAvatar src={assignee.avatar} abbr={getUserAbbr(assignee)} />
      )}

      <Space direction='vertical'>
        <Text>{name}</Text>

        {phone && <Text>{phone}</Text>}
      </Space>
    </Space>
  )
}

export default TaskAssignee
