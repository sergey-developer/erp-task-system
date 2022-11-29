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
  'assignee' | 'status' | 'type' | 'recordId' | 'title' | 'description'
>

const SubTaskListTab: FC<SubTaskListTabProps> = ({
  type,
  title,
  description,
  status,
  assignee,
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
      </Row>

      {modalOpened && (
        <CreateSubTaskModal
          initialFormValues={{ title, description }}
          recordId={recordId}
          isLoading={false}
          onSubmit={async () => {}}
          onCancel={toggleOpenModal}
        />
      )}
    </Space>
  )
}

export default SubTaskListTab
