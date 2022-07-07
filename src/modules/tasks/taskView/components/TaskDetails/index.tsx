import { useBoolean } from 'ahooks'
import React, { FC } from 'react'

import { TaskDetailsModel } from 'modules/tasks/taskView/models'
import { WorkGroupModel } from 'modules/workGroups/models'
import { MaybeNull } from 'shared/interfaces/utils'

import AddTaskSolutionModal from '../AddTaskSolutionModal'
import CardTitle from './CardTitle'
import MainDetails from './MainDetails'
import SecondaryDetails from './SecondaryDetails'
import { CardStyled, DividerStyled, RootWrapperStyled } from './styles'

type TaskDetailsProps = {
  details: MaybeNull<
    Pick<
      TaskDetailsModel,
      | 'id'
      | 'recordId'
      | 'title'
      | 'createdAt'
      | 'name'
      | 'address'
      | 'contactService'
      | 'olaNextBreachTime'
      | 'workGroup'
      | 'assignee'
      | 'status'
      | 'type'
      | 'techResolution'
      | 'userResolution'
    >
  >
  workGroupList: Array<WorkGroupModel>
  onClose: () => void
  taskLoading: boolean
  workGroupListLoading: boolean
}

const TaskDetails: FC<TaskDetailsProps> = ({
  details,
  taskLoading,
  workGroupList,
  workGroupListLoading,
  onClose,
}) => {
  const [addTaskSolutionModalOpened, { setFalse: closeAddTaskSolutionModal }] =
    useBoolean(false)

  const cardTitle = details?.id ? (
    <CardTitle id={details.id} onClose={onClose} />
  ) : null

  return (
    <RootWrapperStyled>
      <CardStyled
        title={cardTitle}
        loading={taskLoading}
        $isLoading={taskLoading}
      >
        {details && (
          <MainDetails
            recordId={details.recordId}
            title={details.title}
            createdAt={details.createdAt}
            olaNextBreachTime={details.olaNextBreachTime}
            name={details.name}
            address={details.address}
            contactService={details.contactService}
          />
        )}

        <DividerStyled />

        <SecondaryDetails
          status={details?.status}
          assignee={details?.assignee}
          workGroupListLoading={workGroupListLoading}
          workGroupList={workGroupList}
          workGroup={details?.workGroup}
        />

        {details && (
          <AddTaskSolutionModal
            title={`Решение по заявке ${details.id}`}
            visible={addTaskSolutionModalOpened}
            onOk={closeAddTaskSolutionModal}
            onCancel={closeAddTaskSolutionModal}
            type={details.type}
          />
        )}
      </CardStyled>
    </RootWrapperStyled>
  )
}

export default TaskDetails
