import { Col, FormInstance, Row } from 'antd'
import React, { FC } from 'react'

import AssigneeBlock from 'modules/task/components/TaskDetails/AssigneeBlock'
import WorkGroupBlock from 'modules/task/components/TaskDetails/WorkGroupBlock'
import { TaskFirstLineFormFields } from 'modules/task/components/TaskFirstLineModal/types'
import { TaskSecondLineFormFields } from 'modules/task/components/TaskSecondLineModal/types'
import { SuspendRequestStatusEnum } from 'modules/task/constants/taskSuspendRequest'
import { TaskAssigneeModel, TaskModel } from 'modules/task/models'
import { UserActionsModel } from 'modules/user/models'

import { EmptyFn } from 'shared/types/utils'

export type SecondaryDetailsProps = Pick<
  TaskModel,
  'id' | 'recordId' | 'workGroup' | 'assignee' | 'status' | 'extendedStatus'
> & {
  userActions: UserActionsModel

  transferTaskToFirstLine: (
    values: TaskFirstLineFormFields,
    setFields: FormInstance<TaskFirstLineFormFields>['setFields'],
    closeTaskFirstLineModal: EmptyFn,
  ) => Promise<void>
  transferTaskToFirstLineIsLoading: boolean

  transferTaskToSecondLine: (
    values: TaskSecondLineFormFields,
    setFields: FormInstance<TaskSecondLineFormFields>['setFields'],
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

  userActions,
}) => {
  return (
    <Row data-testid='task-details-secondary-details' justify='space-between'>
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
          userActions={userActions}
        />
      </Col>

      <Col span={11}>
        <AssigneeBlock
          id={id}
          status={status}
          extendedStatus={extendedStatus}
          assignee={assignee}
          workGroup={workGroup}
          updateAssignee={updateAssignee}
          updateAssigneeIsLoading={updateAssigneeIsLoading}
          takeTask={takeTask}
          takeTaskIsLoading={takeTaskIsLoading}
          taskSuspendRequestStatus={taskSuspendRequestStatus}
          userActions={userActions}
        />
      </Col>
    </Row>
  )
}

export default SecondaryDetails
