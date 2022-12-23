import useBreakpoint from 'antd/es/grid/hooks/useBreakpoint'
import React from 'react'

import { FCWithChildren } from 'shared/interfaces/utils'

import { TaskCardContainerStyled, TaskCardContainerStyledProps } from './styles'

type TaskCardWrapperProps = {
  stretch?: TaskCardContainerStyledProps['$stretch']
}

const TaskCardWrapper: FCWithChildren<TaskCardWrapperProps> = ({
  children,
  ...props
}) => {
  const breakpoints = useBreakpoint()

  return (
    <TaskCardContainerStyled $breakpoints={breakpoints} {...props}>
      {children}
    </TaskCardContainerStyled>
  )
}

export default TaskCardWrapper
