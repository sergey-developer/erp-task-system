import { Divider, Typography } from 'antd'
import React, { FC } from 'react'

import { SubTaskModel } from 'modules/subTask/models'
import {
  SuspendRequestStatusEnum,
  TaskExtendedStatusEnum,
  TaskStatusEnum,
} from 'modules/task/constants/common'

import Space from 'components/Space'

import { formatDate } from 'shared/utils/date'

import SubTask from './SubTask'

const { Text } = Typography

export type SubTaskListProps = {
  taskStatus: TaskStatusEnum
  taskExtendedStatus: TaskExtendedStatusEnum
  currentUserIsTaskAssignee: boolean
  list: Array<SubTaskModel>
  isError: boolean
  onClickCancel: (subTask: SubTaskModel) => void
  onClickRework: (subTask: SubTaskModel) => void

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
              />

              {array.length - 1 !== index && <Divider />}
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
