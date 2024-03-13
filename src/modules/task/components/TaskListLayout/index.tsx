import { Col, Radio, Row } from 'antd'
import React, { FC } from 'react'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'

import { TasksRoutesEnum } from 'modules/task/constants/routes'

import Space from 'components/Space'

const TaskListLayout: FC = () => {
  const navigate = useNavigate()
  const location = useLocation()

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
            defaultValue={location.pathname}
          >
            <Radio.Button value={TasksRoutesEnum.DesktopTaskList}>Реестр</Radio.Button>
            <Radio.Button value={TasksRoutesEnum.DesktopTaskListMap}>Карта</Radio.Button>
          </Radio.Group>
        </Col>
      </Row>

      <Outlet />
    </Space>
  )
}

export default TaskListLayout
