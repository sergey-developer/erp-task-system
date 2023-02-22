import { Col, FormInstance, Row } from 'antd'
import React, { FC, useMemo } from 'react'

import { SuspendRequestStatusEnum } from 'modules/task/constants/common'
import { TaskAssigneeModel, TaskModel } from 'modules/task/models'
import { WorkGroupListModel } from 'modules/workGroup/models'

import { isEqual } from 'shared/utils/common/isEqual'

import TaskAssignee from '../AssigneeBlock'
import { TaskFirstLineFormFields } from '../TaskFirstLineModal/interfaces'
import { TaskSecondLineFormFields } from '../TaskSecondLineModal/interfaces'
import WorkGroupBlock from '../WorkGroupBlock'

export type SecondaryDetailsProps = Pick<
  TaskModel,
  'id' | 'recordId' | 'workGroup' | 'assignee' | 'status' | 'extendedStatus'
> & {
  workGroupList: WorkGroupListModel
  workGroupListIsLoading: boolean

  transferTaskToFirstLine: (
    values: TaskFirstLineFormFields,
    setFields: FormInstance['setFields'],
    closeTaskFirstLineModal: () => void,
  ) => Promise<void>
  transferTaskToFirstLineIsLoading: boolean

  transferTaskToSecondLine: (
    values: TaskSecondLineFormFields,
    setFields: FormInstance['setFields'],
    closeTaskSecondLineModal: () => void,
  ) => Promise<void>
  transferTaskToSecondLineIsLoading: boolean

  takeTask: () => Promise<void>
  takeTaskIsLoading: boolean

  updateAssignee: (assignee: TaskAssigneeModel['id']) => Promise<void>
  updateAssigneeIsLoading: boolean

  taskSuspendRequestStatus?: SuspendRequestStatusEnum
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

  taskSuspendRequestStatus,
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
          transferTaskToFirstLine={transferTaskToFirstLine}
          transferTaskToFirstLineIsLoading={transferTaskToFirstLineIsLoading}
          transferTaskToSecondLine={transferTaskToSecondLine}
          transferTaskToSecondLineIsLoading={transferTaskToSecondLineIsLoading}
          taskSuspendRequestStatus={taskSuspendRequestStatus}
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
          taskSuspendRequestStatus={taskSuspendRequestStatus}
        />
      </Col>
    </Row>
  )
}

export default SecondaryDetails
