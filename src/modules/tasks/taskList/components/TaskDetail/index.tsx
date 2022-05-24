import React, { FC } from 'react'

import CardTitle from './CardTitle'
import MainDetail from './MainDetail'
import SecondaryDetail from './SecondaryDetail'
import { CardStyled, DividerStyled, RootWrapperStyled } from './styles'
import TabsSection from './TabsSection'

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

        <SecondaryDetail />
        <TabsSection />
      </CardStyled>
    </RootWrapperStyled>
  )
}

export default TaskDetail
