import { Space, Typography } from 'antd'
import React, { FC } from 'react'

import UserAvatar from 'components/Avatars/UserAvatar'
import TaskStatus from 'components/TaskStatus'
import { taskStatusDictionary } from 'modules/tasks/constants'
import { TaskDetailsModel } from 'modules/tasks/taskView/models'
import getUserAbbr from 'modules/user/utils/getUserAbbr'

const { Text } = Typography

type PerformerProps = Partial<Pick<TaskDetailsModel, 'assignee' | 'status'>> & {
  name: string
}

const Performer: FC<PerformerProps> = ({ assignee, status, name }) => {
  return (
    <Space size='middle' align='start'>
      {assignee && (
        <UserAvatar src={assignee?.avatar} alt='Avatar'>
          {!assignee?.avatar ? getUserAbbr(assignee) : null}
        </UserAvatar>
      )}

      <Space direction='vertical'>
        <Text className='break-text'>{name}</Text>

        {assignee && status && (
          <TaskStatus status={status} value={taskStatusDictionary[status]} />
        )}
      </Space>
    </Space>
  )
}

export default Performer
