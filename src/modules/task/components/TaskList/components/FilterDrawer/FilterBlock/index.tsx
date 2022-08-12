import { Space } from 'antd'
import useBreakpoint from 'antd/es/grid/hooks/useBreakpoint'
import React from 'react'

import { FCWithChildren } from 'shared/interfaces/utils'

import { DividerStyled, WrapperStyled } from './styles'

type FilterBlockProps = {
  withDivider: boolean
}

const FilterBlock: FCWithChildren<FilterBlockProps> = ({
  children,
  withDivider,
}) => {
  const breakpoints = useBreakpoint()

  return (
    <>
      <WrapperStyled $breakpoints={breakpoints}>
        <Space direction='vertical' size={30}>
          {children}
        </Space>
      </WrapperStyled>

      {withDivider && <DividerStyled />}
    </>
  )
}

export default FilterBlock
