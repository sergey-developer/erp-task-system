import React, { FC } from 'react'

import { TaskDetailsModel } from 'modules/tasks/taskView/models'
import { WorkGroupModel } from 'modules/workGroups/models'
import { MaybeNull } from 'shared/interfaces/utils'

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
    >
  >
  workGroupList: Array<WorkGroupModel>
  onClose: () => void
  isLoading: boolean
}

const TaskDetails: FC<TaskDetailsProps> = ({
  details,
  workGroupList,
  isLoading,
  onClose,
}) => {
  const cardTitle = details?.id ? (
    <CardTitle id={details.id} onClose={onClose} />
  ) : null

  return (
    <RootWrapperStyled>
      <CardStyled title={cardTitle} loading={isLoading} $isLoading={isLoading}>
        {details && (
          <MainDetails
            recordId={details.recordId}
            title={details.title}
            createdAt={details.createdAt}
            name={details.name}
            address={details.address}
            contactService={details.contactService}
            olaNextBreachTime={details.olaNextBreachTime}
          />
        )}

        <DividerStyled />

        <SecondaryDetails
          workGroupList={workGroupList}
          workGroup={details?.workGroup}
        />
      </CardStyled>
    </RootWrapperStyled>
  )
}

export default TaskDetails
