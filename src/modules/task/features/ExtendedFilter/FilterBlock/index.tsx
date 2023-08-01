import { Divider, Space } from 'antd'
import useBreakpoint from 'antd/es/grid/hooks/useBreakpoint'
import React, { FC, ReactNode } from 'react'

import { WrapperStyled } from './styles'

type FilterBlockProps = {
  children: ReactNode
  withDivider: boolean
}

const FilterBlock: FC<FilterBlockProps> = ({
  children,
  withDivider,
  ...props
}) => {
  const breakpoints = useBreakpoint()

  return (
    <>
      <WrapperStyled $breakpoints={breakpoints} {...props}>
        <Space direction='vertical' size={30}>
          {children}
        </Space>
      </WrapperStyled>

      {withDivider && <Divider />}
    </>
  )
}

export default FilterBlock
