import React, { FC } from 'react'

import { TaskDetailModel } from '../../models'
import CardTitle from './CardTitle'
import MainDetails from './MainDetails'
import SecondaryDetails from './SecondaryDetails'
import { CardStyled, DividerStyled, RootWrapperStyled } from './styles'

type TaskDetailsProps = Partial<
  Pick<
    TaskDetailModel,
    | 'id'
    | 'recordId'
    | 'title'
    | 'createdAt'
    | 'name'
    | 'address'
    | 'contactService'
  >
> & {
  onClose: () => void
  isLoading: boolean
}

const TaskDetails: FC<TaskDetailsProps> = ({
  id,
  recordId,
  title,
  createdAt,
  name,
  address,
  contactService,
  isLoading,
  onClose,
}) => {
  const cardTitle = <CardTitle id={id!} onClose={onClose} />

  return (
    <RootWrapperStyled>
      <CardStyled
        title={isLoading ? null : cardTitle}
        loading={isLoading}
        $isLoading={isLoading}
      >
        <MainDetails
          recordId={recordId!}
          title={title!}
          createdAt={createdAt!}
          name={name!}
          address={address!}
          contactService={contactService!}
        />

        <DividerStyled />

        <SecondaryDetails />
      </CardStyled>
    </RootWrapperStyled>
  )
}

export default TaskDetails
