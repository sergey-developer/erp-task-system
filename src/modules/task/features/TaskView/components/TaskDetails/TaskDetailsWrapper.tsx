import useBreakpoint from 'antd/es/grid/hooks/useBreakpoint'
import React from 'react'

import { FCWithChildren } from 'shared/interfaces/utils'

import {
  TaskDetailsContainerStyled,
  TaskDetailsContainerStyledProps,
} from './styles'

type TaskDetailsWrapperProps = {
  stretch?: TaskDetailsContainerStyledProps['$stretch']
}

const TaskDetailsWrapper: FCWithChildren<TaskDetailsWrapperProps> = ({
  children,
  ...props
}) => {
  const breakpoints = useBreakpoint()

  return (
    <TaskDetailsContainerStyled $breakpoints={breakpoints} {...props}>
      {children}
    </TaskDetailsContainerStyled>
  )
}

export default TaskDetailsWrapper
