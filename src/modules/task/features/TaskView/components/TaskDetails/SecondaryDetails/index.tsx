import { Col, Row } from 'antd'
import useBreakpoint from 'antd/es/grid/hooks/useBreakpoint'
import React, { FC, useMemo } from 'react'

import { TaskDetailsModel } from 'modules/task/features/TaskView/models'
import { WorkGroupListItemModel } from 'modules/workGroup/features/WorkGroupList/models'
import { AssigneeModel } from 'shared/interfaces/models'

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

  updateTaskAssignee: (assignee: AssigneeModel['id']) => Promise<void>
  updateTaskAssigneeIsLoading: boolean

  reclassificationRequestExist: boolean
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

  updateTaskAssignee,
  updateTaskAssigneeIsLoading,

  reclassificationRequestExist,
}) => {
  const breakpoints = useBreakpoint()

  const workGroup = useMemo(
    () =>
      workGroupList.find(
        (workGroupListItem) =>
          workGroupListItem.id === taskDetailsWorkGroup?.id,
      ),
    [taskDetailsWorkGroup?.id, workGroupList],
  )

  return (
    <DetailsContainerStyled $breakpoints={breakpoints}>
      <Row justify='space-between'>
        <Col span={12}>
          <WorkGroup
            id={id}
            status={status}
            workGroup={workGroup}
            workGroupList={workGroupList}
            workGroupListIsLoading={workGroupListIsLoading}
            transferTask={transferTask}
            transferTaskIsLoading={transferTaskIsLoading}
            reclassificationRequestExist={reclassificationRequestExist}
          />
        </Col>

        <Col span={10}>
          <TaskAssignee
            status={status}
            extendedStatus={extendedStatus}
            assignee={assignee}
            workGroup={workGroup}
            workGroupListIsLoading={workGroupListIsLoading}
            updateTaskAssignee={updateTaskAssignee}
            updateTaskAssigneeIsLoading={updateTaskAssigneeIsLoading}
            reclassificationRequestExist={reclassificationRequestExist}
          />
        </Col>
      </Row>
    </DetailsContainerStyled>
  )
}

export default SecondaryDetails
