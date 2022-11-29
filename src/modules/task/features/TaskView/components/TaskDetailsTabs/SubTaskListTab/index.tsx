import { useBoolean } from 'ahooks'
import { Button, Col, Row, Typography } from 'antd'
import React, { FC } from 'react'

import Space from 'components/Space'
import { useCheckUserAuthenticated } from 'modules/auth/hooks'
import { TaskDetailsModel } from 'modules/task/features/TaskView/models'
import { useTaskStatus, useTaskType } from 'modules/task/hooks'

import CreateSubTaskModal from '../../CreateSubTaskModal'

const { Title } = Typography

export type SubTaskListTabProps = Pick<
  TaskDetailsModel,
  'assignee' | 'status' | 'type' | 'recordId'
>

const SubTaskListTab: FC<SubTaskListTabProps> = ({
  assignee,
  status,
  type,
  recordId,
}) => {
  const [modalOpened, { toggle: toggleOpenModal }] = useBoolean(false)

  const currentUserIsAssignee = useCheckUserAuthenticated(assignee?.id)
  const taskStatus = useTaskStatus(status)
  const taskType = useTaskType(type)

  return (
    <Space data-testid='subtask-list-tab' direction='vertical' $block>
      <Row justify='space-between' align='middle'>
        <Col>
          <Title level={5}>Задания</Title>
        </Col>

        {currentUserIsAssignee &&
          taskStatus.isInProgress &&
          (taskType.isIncident || taskType.isRequest) && (
            <Col>
              <Button type='link'>+ Создать новое задание</Button>
            </Col>
          )}

        <Col>
          <Button type='link' onClick={toggleOpenModal}>
            + Создать новое задание
          </Button>
        </Col>
      </Row>

      {modalOpened && (
        <CreateSubTaskModal
          recordId={recordId}
          isLoading={false}
          onCancel={toggleOpenModal}
        />
      )}
    </Space>
  )
}

export default SubTaskListTab
