import { Col, Row } from 'antd'
import React, { FC, useMemo } from 'react'

import { TaskAssigneeModel, TaskModel } from 'modules/task/models'
import { isEqual } from 'shared/utils/common/isEqual'

import TaskAssignee from '../AssigneeBlock'
import WorkGroupBlock, { WorkGroupBlockProps } from '../WorkGroupBlock'

export type SecondaryDetailsProps = Pick<
  TaskModel,
  'id' | 'recordId' | 'workGroup' | 'assignee' | 'status' | 'extendedStatus'
> &
  Pick<
    WorkGroupBlockProps,
    | 'workGroupList'
    | 'workGroupListIsLoading'
    | 'transferTaskToFirstLine'
    | 'transferTaskToFirstLineIsLoading'
    | 'transferTaskToSecondLine'
    | 'transferTaskToSecondLineIsLoading'
  > & {
    takeTask: () => Promise<void>
    takeTaskIsLoading: boolean

    updateAssignee: (assignee: TaskAssigneeModel['id']) => Promise<void>
    updateAssigneeIsLoading: boolean
  }

const SecondaryDetails: FC<SecondaryDetailsProps> = ({
  id,
  recordId,

  assignee,

  status,
  extendedStatus,

  workGroup: taskWorkGroup,
  workGroupList,
  workGroupListIsLoading,

  transferTaskToFirstLine,
  transferTaskToFirstLineIsLoading,
  transferTaskToSecondLine,
  transferTaskToSecondLineIsLoading,

  takeTask,
  takeTaskIsLoading,

  updateAssignee,
  updateAssigneeIsLoading,
}) => {
  const workGroup = useMemo(
    () =>
      workGroupList.find((workGroupListItem) =>
        isEqual(workGroupListItem.id, taskWorkGroup?.id),
      ),
    [taskWorkGroup?.id, workGroupList],
  )

  return (
    <Row data-testid='task-card-secondary-details' justify='space-between'>
      <Col span={11}>
        <WorkGroupBlock
          id={id}
          recordId={recordId}
          status={status}
          extendedStatus={extendedStatus}
          workGroup={workGroup}
          workGroupList={workGroupList}
          workGroupListIsLoading={workGroupListIsLoading}
          transferTaskToFirstLine={transferTaskToFirstLine}
          transferTaskToFirstLineIsLoading={transferTaskToFirstLineIsLoading}
          transferTaskToSecondLine={transferTaskToSecondLine}
          transferTaskToSecondLineIsLoading={transferTaskToSecondLineIsLoading}
        />
      </Col>

      <Col span={11}>
        <TaskAssignee
          status={status}
          extendedStatus={extendedStatus}
          assignee={assignee}
          workGroup={workGroup}
          workGroupListIsLoading={workGroupListIsLoading}
          updateAssignee={updateAssignee}
          updateAssigneeIsLoading={updateAssigneeIsLoading}
          takeTask={takeTask}
          takeTaskIsLoading={takeTaskIsLoading}
        />
      </Col>
    </Row>
  )
}

export default SecondaryDetails
