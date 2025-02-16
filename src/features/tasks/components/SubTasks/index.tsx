import { Divider, Typography } from 'antd'
import { SuspendRequestStatusEnum } from 'features/tasks/api/constants'
import { SubTaskDTO, TaskDetailDTO } from 'features/tasks/api/dto'
import { MatchedUserPermissions } from 'features/users/types'
import React, { FC } from 'react'

import Space from 'components/Space'

import { checkLastItem } from 'shared/utils/common'
import { formatDate } from 'shared/utils/date'

import SubTask from './SubTask'

const { Text } = Typography

export type SubTasksProps = {
  taskStatus: TaskDetailDTO['status']
  taskExtendedStatus: TaskDetailDTO['extendedStatus']
  currentUserIsTaskAssignee: boolean
  list: SubTaskDTO[]
  isError: boolean
  onClickCancel: (subTask: SubTaskDTO) => void
  onClickRework: (subTask: SubTaskDTO) => void
  permissions: MatchedUserPermissions

  taskSuspendRequestStatus?: SuspendRequestStatusEnum
}

const SubTasks: FC<SubTasksProps> = ({
  taskStatus,
  taskExtendedStatus,
  currentUserIsTaskAssignee,
  list,
  isError,
  onClickCancel,
  onClickRework,
  taskSuspendRequestStatus,
  permissions,
}) => {
  return (
    <Space data-testid='sub-task-list' $block direction='vertical'>
      {list.length ? (
        <Space $block direction='vertical' size='large'>
          {list.map((item, index, array) => (
            <React.Fragment key={item.id}>
              <SubTask
                key={item.id}
                title={item.title}
                description={item.description}
                recordId={item.recordId}
                olaNextBreachTime={formatDate(item.olaNextBreachTime)}
                status={item.status}
                createdAt={formatDate(item.createdAt)}
                supportGroup={item.supportGroup}
                externalAssigneeName={item.externalAssigneeName}
                externalAssigneePhone={item.externalAssigneePhone}
                techResolution={item.techResolution}
                onClickCancel={() => onClickCancel(item)}
                onClickRework={() => onClickRework(item)}
                taskStatus={taskStatus}
                taskExtendedStatus={taskExtendedStatus}
                currentUserIsTaskAssignee={currentUserIsTaskAssignee}
                returnReason={item.returnReason}
                cancelReason={item.cancelReason}
                taskSuspendRequestStatus={taskSuspendRequestStatus}
                permissions={permissions}
              />

              {!checkLastItem(index, array) && <Divider />}
            </React.Fragment>
          ))}
        </Space>
      ) : (
        <Text>{isError ? 'Не удалось получить задания' : 'Заданий нет'}</Text>
      )}
    </Space>
  )
}

export default SubTasks
