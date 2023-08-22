import { Button, DrawerProps, Row, Space } from 'antd'
import useBreakpoint from 'antd/es/grid/hooks/useBreakpoint'
import React from 'react'

import { FCWithChildren } from 'shared/types/utils'

import { DrawerStyled } from './styles'

export type DrawerFilterProps = Required<
  Pick<DrawerProps, 'onClose' | 'visible'>
> &
  Pick<DrawerProps, 'title' | 'placement'> & {
    onApply: () => void
    onReset: () => void
  }

const DrawerFilter: FCWithChildren<DrawerFilterProps> = ({
  title = 'Фильтры',
  placement = 'left',
  visible,
  onClose,
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
      $breakpoints={breakpoints}
      visible={visible}
      title={title}
      placement={placement}
      width={breakpoints.xxl ? 500 : 380}
      onClose={onClose}
      footer={footer}
    >
      {children}
    </DrawerStyled>
  )
}

export default DrawerFilter
