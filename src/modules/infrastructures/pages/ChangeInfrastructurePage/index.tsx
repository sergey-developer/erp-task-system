import { Button, Col, Flex, Row, Space, Typography } from 'antd'
import { FC } from 'react'
import { useLocation, useParams } from 'react-router-dom'

import TaskAssignee from 'modules/task/components/TaskAssignee'
import ReadonlyField from 'modules/warehouse/components/RelocationTaskDetails/ReadonlyField'

import { MaybeUndefined } from 'shared/types/utils'
import { valueOrHyphen } from 'shared/utils/common'

import { ChangeInfrastructurePageLocationState } from './types'

const { Title } = Typography

const ChangeInfrastructurePage: FC = () => {
  const location = useLocation()
  const locationState: MaybeUndefined<ChangeInfrastructurePageLocationState> = location.state
  const task = locationState?.task

  const params = useParams<'id'>()
  const infrastructureId = Number(params?.id) || undefined

  return (
    <Space data-testid='change-infrastructure-page' direction='vertical' size='large'>
      <Flex gap='small' align='end'>
        <Title level={4}>Изменение инфраструктуры по заявке</Title>

        {task?.recordId && (
          <Button type='link' size='large'>
            {task.recordId}
          </Button>
        )}
      </Flex>

      <Row>
        <Col span={10}>
          <ReadonlyField
            label='Исполнитель'
            value={valueOrHyphen(task?.assignee, (value) => (
              <TaskAssignee {...value} showAvatar={false} showPhone={false} hasPopover />
            ))}
          />
        </Col>
      </Row>
    </Space>
  )
}

export default ChangeInfrastructurePage
