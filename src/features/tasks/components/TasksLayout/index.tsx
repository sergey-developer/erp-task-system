import { Col, Radio, RadioGroupProps, Row } from 'antd'
import { TasksRoutesEnum } from 'features/tasks/routes/routes'
import React, { FC } from 'react'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'

import Space from 'components/Space'

const radioOptions: RadioGroupProps['options'] = [
  { label: 'Реестр', value: TasksRoutesEnum.DesktopTasks },
  { label: 'Карта', value: TasksRoutesEnum.DesktopTasksMap },
]

const TasksLayout: FC = () => {
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

export default TasksLayout
