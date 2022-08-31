import useBreakpoint from 'antd/es/grid/hooks/useBreakpoint'

import { FCWithChildren } from 'shared/interfaces/utils'

import { DetailsContainerStyled } from '../TaskDetails/styles'

const TabWrapper: FCWithChildren = ({ children }) => {
  const breakpoints = useBreakpoint()

  return (
    <DetailsContainerStyled $breakpoints={breakpoints}>
      {children}
    </DetailsContainerStyled>
  )
}

export default TabWrapper
