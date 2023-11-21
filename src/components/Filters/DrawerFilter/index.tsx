import { Button, DrawerProps, Row, Space } from 'antd'
import useBreakpoint from 'antd/es/grid/hooks/useBreakpoint'
import React from 'react'

import { EmptyFn, FCWithChildren } from 'shared/types/utils'

import { DrawerStyled } from './styles'

export type DrawerFilterProps = Pick<DrawerProps, 'open' | 'title' | 'placement'> & {
  onApply: EmptyFn
  onReset: EmptyFn
  onClose: EmptyFn
}

const DrawerFilter: FCWithChildren<DrawerFilterProps> = ({
  title = 'Фильтры',
  placement = 'left',
  onApply,
  onReset,
  children,
  ...props
}) => {
  const breakpoints = useBreakpoint()

  const footer = (
    <Row justify='end'>
      <Space>
        <Button onClick={onReset}>Сбросить все</Button>

        <Button type='primary' onClick={onApply}>
          Применить
        </Button>
      </Space>
    </Row>
  )

  return (
    <DrawerStyled
      {...props}
      title={title}
      placement={placement}
      width={breakpoints.xxl ? 500 : 380}
      footer={footer}
    >
      {children}
    </DrawerStyled>
  )
}

export default DrawerFilter
