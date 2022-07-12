import React, { FC } from 'react'

import { TaskDetailsModel } from 'modules/tasks/taskView/models'
import { WorkGroupModel } from 'modules/workGroups/models'
import { MaybeNull } from 'shared/interfaces/utils'

import CardTitle from './CardTitle'
import MainDetails from './MainDetails'
import SecondaryDetails from './SecondaryDetails'
import { CardStyled, DividerStyled, RootWrapperStyled } from './styles'
import TabsSection from './TabsSection'

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
      | 'description'
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
          <TabsSection
            type={details.type}
            techResolution={details.techResolution}
            userResolution={details.userResolution}
            description={details.description}
            comments={[]}
          />
        )}
      </CardStyled>
    </RootWrapperStyled>
  )
}

export default TaskDetails
