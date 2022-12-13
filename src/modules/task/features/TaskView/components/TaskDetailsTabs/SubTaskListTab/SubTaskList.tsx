import { Typography } from 'antd'
import React, { FC } from 'react'

import Space from 'components/Space'
import { useCheckUserAuthenticated } from 'modules/auth/hooks'
import {
  SubTaskModel,
  TaskDetailsModel,
} from 'modules/task/features/TaskView/models'
import { useTaskStatus } from 'modules/task/hooks'
import { DATE_TIME_FORMAT } from 'shared/constants/dateTime'
import formatDate from 'shared/utils/date/formatDate'

import SubTask from './SubTask'

const { Text } = Typography

type SubTaskListProps = {
  task: Pick<TaskDetailsModel, 'status' | 'parentTask'>
  list: Array<SubTaskModel>
  isError: boolean
  onClickCancel: (id: SubTaskModel['id']) => void
  onClickRework: (id: SubTaskModel['id']) => void
}

const SubTaskList: FC<SubTaskListProps> = ({
  task,
  list,
  isError,
  onClickCancel,
  onClickRework,
}) => {
  const currentUserIsParentTaskAssignee = useCheckUserAuthenticated(
    task.parentTask?.assignee,
  )
  const taskStatus = useTaskStatus(task.status)
  const parentTaskStatus = useTaskStatus(task.parentTask?.status)

  const showReworkBtn =
    currentUserIsParentTaskAssignee &&
    (taskStatus.isCompleted || taskStatus.isClosed) &&
    !parentTaskStatus.isCompleted &&
    !parentTaskStatus.isClosed

  const showCancelBtn =
    currentUserIsParentTaskAssignee &&
    taskStatus.isNew &&
    !parentTaskStatus.isCompleted &&
    !parentTaskStatus.isClosed

  return (
    <Space $block direction='vertical'>
      {list.length ? (
        <Space $block direction='vertical' size='large'>
          {list.map((subTask) => (
            <SubTask
              key={subTask.id}
              id={subTask.id}
              title={subTask.title}
              description={subTask.description}
              recordId={subTask.recordId}
              olaNextBreachTime={formatDate(
                subTask.olaNextBreachTime,
                DATE_TIME_FORMAT,
              )}
              status={subTask.status}
              createdAt={formatDate(subTask.createdAt, DATE_TIME_FORMAT)}
              workGroupName={subTask.workGroup?.name || ''} //todo: поправить когда на бэке поправят
              externalAssigneeName={subTask.externalAssigneeName}
              externalAssigneePhone={subTask.externalAssigneePhone}
              techResolution={subTask.techResolution}
              showCancelBtn={showCancelBtn}
              onClickCancel={onClickCancel}
              showReworkBtn={showReworkBtn}
              onClickRework={onClickRework}
            />
          ))}
        </Space>
      ) : (
        <Text>{isError ? 'Не удалось получить задания' : 'Заданий нет'}</Text>
      )}
    </Space>
  )
}

export default SubTaskList
