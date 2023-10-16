import React from 'react'

import { FCWithChildren } from 'shared/types/utils'

import { TaskCardContainerStyled, TaskCardContainerStyledProps } from './Card/styles'

type TaskCardWrapperProps = {
  stretch?: TaskCardContainerStyledProps['$stretch']
}

const TaskCardWrapper: FCWithChildren<TaskCardWrapperProps> = ({ children, ...props }) => {
  return <TaskCardContainerStyled {...props}>{children}</TaskCardContainerStyled>
}

export default TaskCardWrapper
