import { useBoolean } from 'ahooks'
import { Button, Col, Row, Typography } from 'antd'
import React, { FC, useEffect } from 'react'

import ModalFallback from 'components/Modals/ModalFallback'
import Space from 'components/Space'
import { useCheckUserAuthenticated } from 'modules/auth/hooks'
import useLazyGetSubTaskTemplateList from 'modules/task/features/TaskView/hooks/useLazyGetSubTaskTemplateList'
import { TaskDetailsModel } from 'modules/task/features/TaskView/models'
import { useTaskStatus, useTaskType } from 'modules/task/hooks'

const CreateSubTaskModal = React.lazy(() => import('../../CreateSubTaskModal'))

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
  const {
    fn: getTemplateList,
    state: { isLoading: templateListIsLoading, currentData: templateList = [] },
  } = useLazyGetSubTaskTemplateList()

  const [modalOpened, { toggle: toggleOpenModal }] = useBoolean(false)

  const taskType = useTaskType(type)
  const taskStatus = useTaskStatus(status)
  const currentUserIsAssignee = useCheckUserAuthenticated(assignee?.id)

  useEffect(() => {
    if (modalOpened) {
      getTemplateList()
    }
  }, [getTemplateList, modalOpened])

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
        <React.Suspense
          fallback={
            <ModalFallback visible={modalOpened} onCancel={toggleOpenModal} />
          }
        >
          <CreateSubTaskModal
            initialFormValues={{ title, description }}
            recordId={recordId}
            templateOptions={templateList}
            templateOptionsIsLoading={templateListIsLoading}
            isLoading={false}
            onSubmit={async () => {}}
            onCancel={toggleOpenModal}
          />
        </React.Suspense>
      )}
    </Space>
  )
}

export default SubTaskListTab
