import React, { FC } from 'react'

import CardTitle from './CardTitle'
import MainDetail from './MainDetail'
import { CardStyled, DividerStyled, RootWrapperStyled } from './styles'

type TaskDetailProps = {
  onClose: () => void
}

const TaskDetail: FC<TaskDetailProps> = ({ onClose }) => {
  const cardTitle = <CardTitle onClose={onClose} />

  return (
    <RootWrapperStyled>
      <CardStyled title={cardTitle}>
        <MainDetail />

        <DividerStyled />
      </CardStyled>
    </RootWrapperStyled>
  )
}

export default TaskDetail
