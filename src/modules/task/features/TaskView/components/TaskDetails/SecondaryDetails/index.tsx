import { Col, Row } from 'antd'
import useBreakpoint from 'antd/es/grid/hooks/useBreakpoint'
import React, { FC, useMemo } from 'react'

import { TaskDetailsModel } from 'modules/task/features/TaskView/models'
import { TaskAssigneeModel } from 'modules/task/models'
import { WorkGroupListItemModel } from 'modules/workGroup/features/WorkGroupList/models'
import { isEqual } from 'shared/utils/common/isEqual'

import { DetailsContainerStyled } from '../styles'
import TaskAssignee from '../TaskAssignee'
import WorkGroup from '../WorkGroup'

type SecondaryDetailsProps = Pick<
  TaskDetailsModel,
  'id' | 'workGroup' | 'assignee' | 'status' | 'extendedStatus'
> & {
  workGroupList: Array<WorkGroupListItemModel>
  workGroupListIsLoading: boolean

  transferTask: (
    workGroup: WorkGroupListItemModel['id'],
    closeTaskSecondLineModal: () => void,
  ) => Promise<void>
  transferTaskIsLoading: boolean

  takeTask: () => Promise<void>
  takeTaskIsLoading: boolean

  updateAssignee: (assignee: TaskAssigneeModel['id']) => Promise<void>
  updateAssigneeIsLoading: boolean

  hasReclassificationRequest: boolean
}

const SecondaryDetails: FC<SecondaryDetailsProps> = ({
  id,
  assignee,

  status,
  extendedStatus,

  workGroup: taskDetailsWorkGroup,
  workGroupList,
  workGroupListIsLoading,

  transferTask,
  transferTaskIsLoading,

  takeTask,
  takeTaskIsLoading,

  updateAssignee,
  updateAssigneeIsLoading,

  hasReclassificationRequest,
}) => {
  const breakpoints = useBreakpoint()

  const workGroup = useMemo(
    () =>
      workGroupList.find((workGroupListItem) =>
        isEqual(workGroupListItem.id, taskDetailsWorkGroup?.id),
      ),
    [taskDetailsWorkGroup?.id, workGroupList],
  )

  return (
    <DetailsContainerStyled $breakpoints={breakpoints}>
      <Row justify='space-between'>
        <Col span={11}>
          <WorkGroup
            id={id}
            status={status}
            workGroup={workGroup}
            workGroupList={workGroupList}
            workGroupListIsLoading={workGroupListIsLoading}
            transferTask={transferTask}
            transferTaskIsLoading={transferTaskIsLoading}
            hasReclassificationRequest={hasReclassificationRequest}
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
            hasReclassificationRequest={hasReclassificationRequest}
          />
        </Col>
      </Row>
    </DetailsContainerStyled>
  )
}

export default SecondaryDetails
