import { Col, Radio, Row } from 'antd'
import React, { FC } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'

import { RouteEnum } from 'configs/routes'

import Space from 'components/Space'

type TaskListLayoutProps = {
  defaultRoute: RouteEnum.TaskList | RouteEnum.TaskListMap
}

const TaskListLayout: FC<TaskListLayoutProps> = ({ defaultRoute }) => {
  const navigate = useNavigate()

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
          <Radio.Group
            onChange={(event) => navigate(event.target.value)}
            defaultValue={defaultRoute}
          >
            <Radio.Button value={RouteEnum.TaskList}>Реестр</Radio.Button>
            <Radio.Button value={RouteEnum.TaskListMap}>Карта</Radio.Button>
          </Radio.Group>
        </Col>
      </Row>

      <Outlet />
    </Space>
  )
}

export default TaskListLayout
