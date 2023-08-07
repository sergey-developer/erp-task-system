import { Button, Col, Row, Typography } from 'antd'
import React from 'react'
import { NavLink } from 'react-router-dom'

import { RouteEnum } from 'configs/routes'

import Space from 'components/Space'

import { FCWithChildren } from 'shared/types/utils'

const { Text } = Typography

const TaskListLayout: FCWithChildren = ({ children }) => {
  return (
    <Space
      className='task-list-layout'
      data-testid='task-list-layout'
      direction='vertical'
      size='middle'
      $block
      $height='100%'
    >
      <Row className='task-list-layout-header' justify='end'>
        <Col>
          <NavLink to={RouteEnum.TaskList}>
            {({ isActive }) => {
              const text = 'Реестр'
              return <Button>{isActive ? text : <Text>{text}</Text>}</Button>
            }}
          </NavLink>

          <NavLink to={RouteEnum.TaskListMap}>
            {({ isActive }) => {
              const text = 'Карта'
              return <Button>{isActive ? text : <Text>{text}</Text>}</Button>
            }}
          </NavLink>
        </Col>
      </Row>

      {children}
    </Space>
  )
}

export default TaskListLayout
