import { Flex, Popover, Space, Typography } from 'antd'
import React, { FC } from 'react'

import UserShortInfo from 'modules/task/components/UserShortInfo'
import { TaskAssigneeModel } from 'modules/task/models'
import { getFullUserName, getUserAbbr } from 'modules/user/utils'

import UserAvatar from 'components/Avatars/UserAvatar'

const { Text } = Typography

export type TaskAssigneeProps = Pick<TaskAssigneeModel, 'firstName' | 'lastName' | 'middleName'> &
  Partial<Pick<TaskAssigneeModel, 'id' | 'position' | 'phone' | 'email' | 'avatar'>> & {
    hasPopover?: boolean
  }

const TaskAssignee: FC<TaskAssigneeProps> = ({
  firstName,
  lastName,
  middleName,
  position,
  email,
  phone,
  avatar,

  hasPopover,
}) => {
  const fullName = getFullUserName({ firstName, lastName, middleName })

  return (
    <Space data-testid='task-assignee' align='center'>
      <UserAvatar src={avatar} abbr={getUserAbbr({ firstName, lastName })} />

      <Flex vertical gap='small'>
        {hasPopover ? (
          <Popover
            content={
              <UserShortInfo email={email} phone={phone} position={position} skip={['fio']} />
            }
          >
            {fullName}
          </Popover>
        ) : (
          <Text>{fullName}</Text>
        )}

        {phone && <Text>{phone}</Text>}
      </Flex>
    </Space>
  )
}

export default TaskAssignee
