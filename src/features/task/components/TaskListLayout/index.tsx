import { Col, Radio, RadioGroupProps, Row } from 'antd'
import React, { FC } from 'react'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'

import { TasksRoutesEnum } from 'features/task/constants/routes'

import Space from 'components/Space'

const radioOptions: RadioGroupProps['options'] = [
  { label: 'Реестр', value: TasksRoutesEnum.DesktopTasks },
  { label: 'Карта', value: TasksRoutesEnum.DesktopTasksMap },
]

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
            optionType='button'
            onChange={(event) => navigate(event.target.value)}
            defaultValue={location.pathname}
            options={radioOptions}
          />
        </Col>
      </Row>

      <Outlet />
    </Space>
  )
}

export default TaskListLayout
