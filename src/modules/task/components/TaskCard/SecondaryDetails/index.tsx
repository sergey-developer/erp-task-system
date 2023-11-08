import { Col, FormInstance, Row } from 'antd'
import React, { FC } from 'react'

import AssigneeBlock from 'modules/task/components/TaskCard/AssigneeBlock'
import WorkGroupBlock from 'modules/task/components/TaskCard/WorkGroupBlock'
import { TaskFirstLineFormFields } from 'modules/task/components/TaskFirstLineModal/types'
import { TaskSecondLineFormFields } from 'modules/task/components/TaskSecondLineModal/types'
import { SuspendRequestStatusEnum } from 'modules/task/constants/taskSuspendRequest'
import { TaskAssigneeModel, TaskModel } from 'modules/task/models'

import { EmptyFn } from 'shared/types/utils'

export type SecondaryDetailsProps = Pick<
  TaskModel,
  'id' | 'recordId' | 'workGroup' | 'assignee' | 'status' | 'extendedStatus'
> & {
  transferTaskToFirstLine: (
    values: TaskFirstLineFormFields,
    setFields: FormInstance['setFields'],
    closeTaskFirstLineModal: EmptyFn,
  ) => Promise<void>
  transferTaskToFirstLineIsLoading: boolean

  transferTaskToSecondLine: (
    values: TaskSecondLineFormFields,
    setFields: FormInstance['setFields'],
    closeTaskSecondLineModal: EmptyFn,
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

  workGroup,

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
        <AssigneeBlock
          status={status}
          extendedStatus={extendedStatus}
          assignee={assignee}
          workGroup={workGroup}
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
