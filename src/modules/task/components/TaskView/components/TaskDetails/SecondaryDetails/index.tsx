import { Col, Row } from 'antd'
import React, { FC } from 'react'

import { TaskDetailsModel } from 'modules/task/components/TaskView/models'
import { WorkGroupListItemModel } from 'modules/workGroup/workGroupList/models'
import { AssigneeModel } from 'shared/interfaces/models'
import { ErrorResponse } from 'shared/services/api'

import { DetailContainerStyled } from '../styles'
import TaskAssignee from '../TaskAssignee'
import WorkGroup from '../WorkGroup'

type SecondaryDetailsProps = Pick<
  TaskDetailsModel,
  'id' | 'workGroup' | 'assignee' | 'status'
> & {
  workGroupList: Array<WorkGroupListItemModel>
  workGroupListIsLoading: boolean

  transferTask: (
    workGroup: WorkGroupListItemModel['id'],
    closeTaskSecondLineModal: () => void,
  ) => Promise<void>
  transferTaskIsLoading: boolean

  updateTaskAssignee: (assignee: AssigneeModel['id']) => Promise<void>
  updateTaskAssigneeIsLoading: boolean

  getWorkGroupListError?: ErrorResponse
}

const SecondaryDetails: FC<SecondaryDetailsProps> = ({
  id,
  status,
  assignee,

  workGroup,
  workGroupList,
  workGroupListIsLoading,
  getWorkGroupListError,

  transferTask,
  transferTaskIsLoading,

  updateTaskAssignee,
  updateTaskAssigneeIsLoading,
}) => {
  return (
    <DetailContainerStyled>
      <Row justify='space-between'>
        <Col span={12}>
          <WorkGroup
            id={id}
            status={status}
            workGroup={workGroup}
            workGroupList={workGroupList}
            workGroupListIsLoading={workGroupListIsLoading}
            getWorkGroupListError={getWorkGroupListError}
            transferTask={transferTask}
            transferTaskIsLoading={transferTaskIsLoading}
          />
        </Col>

        <Col span={10}>
          <TaskAssignee
            status={status}
            assignee={assignee}
            workGroup={workGroup}
            workGroupListIsLoading={workGroupListIsLoading}
            updateTaskAssignee={updateTaskAssignee}
            updateTaskAssigneeIsLoading={updateTaskAssigneeIsLoading}
          />
        </Col>
      </Row>
    </DetailContainerStyled>
  )
}

export default SecondaryDetails
