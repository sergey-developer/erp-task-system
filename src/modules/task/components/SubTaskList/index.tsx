import { Divider, Typography } from 'antd'
import React, { FC } from 'react'

import { TaskExtendedStatusEnum, TaskStatusEnum } from 'modules/task/constants/task'
import { SuspendRequestStatusEnum } from 'modules/task/constants/taskSuspendRequest'
import { SubTaskModel } from 'modules/task/models'
import { MatchedUserPermissions } from 'modules/user/types'

import Space from 'components/Space'

import { checkLastItem } from 'shared/utils/common'
import { formatDate } from 'shared/utils/date'

import SubTask from './SubTask'

const { Text } = Typography

export type SubTaskListProps = {
  taskStatus: TaskStatusEnum
  taskExtendedStatus: TaskExtendedStatusEnum
  currentUserIsTaskAssignee: boolean
  list: SubTaskModel[]
  isError: boolean
  onClickCancel: (subTask: SubTaskModel) => void
  onClickRework: (subTask: SubTaskModel) => void
  permissions: MatchedUserPermissions

  taskSuspendRequestStatus?: SuspendRequestStatusEnum
}

const SubTaskList: FC<SubTaskListProps> = ({
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

export default SubTaskList
