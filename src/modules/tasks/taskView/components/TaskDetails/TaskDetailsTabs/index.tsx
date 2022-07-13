import { Tabs } from 'antd'
import React from 'react'

import { FCWithChildren } from 'shared/interfaces/utils'

import { DetailContainerStyled } from '../styles'
import { TaskDetailsTabsEnum } from './constants'

export type TaskDetailsTabsProps = {
  defaultTabKey: TaskDetailsTabsEnum
}

const TaskDetailsTabs: FCWithChildren<TaskDetailsTabsProps> = ({
  defaultTabKey,
  children,
}) => {
  return (
    <DetailContainerStyled>
      <Tabs defaultActiveKey={defaultTabKey}>{children}</Tabs>
    </DetailContainerStyled>
  )
}

export default TaskDetailsTabs
