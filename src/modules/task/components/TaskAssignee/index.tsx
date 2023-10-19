import { Popover, Typography } from 'antd'
import React, { FC } from 'react'

import UserShortInfo from 'modules/task/components/UserShortInfo'
import { TaskAssigneeModel, TaskModel } from 'modules/task/models'
import { getUserAbbr } from 'modules/user/utils'

import UserAvatar from 'components/Avatars/UserAvatar'
import Space from 'components/Space'

import { MaybeNull } from 'shared/types/utils'

const { Text } = Typography

type TaskAssigneeProps = {
  name: string
  assignee: MaybeNull<
    Pick<TaskAssigneeModel, 'firstName' | 'lastName' | 'middleName'> &
      Partial<Pick<TaskAssigneeModel, 'id' | 'role' | 'phone' | 'email' | 'avatar'>>
  >
  phone?: TaskModel['contactPhone']
}

const TaskAssignee: FC<TaskAssigneeProps> = ({ assignee, name, phone }) => {
  return (
    <Space data-testid='task-assignee' size='middle' align='start'>
      {assignee && <UserAvatar src={assignee.avatar} abbr={getUserAbbr(assignee)} />}

      <Space direction='vertical'>
        {assignee ? (
          <Popover
            content={
              <UserShortInfo
                email={assignee.email}
                phone={assignee.phone}
                role={assignee.role}
                skip={['fio']}
              />
            }
          >
            {name}
          </Popover>
        ) : (
          <Text>{name}</Text>
        )}

        {phone && <Text>{phone}</Text>}
      </Space>
    </Space>
  )
}

export default TaskAssignee
