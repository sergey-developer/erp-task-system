import { Flex, Popover, Space, Typography } from 'antd'
import { TaskAssigneeDTO } from 'features/tasks/api/dto'
import UserShortInfo from 'features/tasks/components/UserShortInfo'
import { getFullUserName, getUserAbbr } from 'features/users/helpers'
import React, { FC } from 'react'

import UserAvatar from 'components/Avatars/UserAvatar'

const { Text } = Typography

export type TaskAssigneeProps = Pick<TaskAssigneeDTO, 'firstName' | 'lastName' | 'middleName'> &
  Partial<Pick<TaskAssigneeDTO, 'id' | 'position' | 'phone' | 'email' | 'avatar'>> & {
    showPhone?: boolean
    showAvatar?: boolean
    hasPopover?: boolean
  }

// todo: переименовать в UserInfo и переместить в папку user
const TaskAssignee: FC<TaskAssigneeProps> = ({
  firstName,
  lastName,
  middleName,
  position,
  email,
  phone,
  avatar,
  showAvatar = true,
  showPhone = true,
  hasPopover = false,
}) => {
  const fullName = getFullUserName({ firstName, lastName, middleName })

  return (
    <Space data-testid='task-taskAssignee' align='center'>
      {showAvatar && <UserAvatar src={avatar} abbr={getUserAbbr({ firstName, lastName })} />}

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

        {showPhone && phone && <Text>{phone}</Text>}
      </Flex>
    </Space>
  )
}

export default TaskAssignee
