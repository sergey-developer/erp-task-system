import { useBoolean } from 'ahooks'
import { Button, Col, Row, Typography } from 'antd'
import React, { FC, useCallback, useEffect } from 'react'

import ModalFallback from 'components/Modals/ModalFallback'
import Space from 'components/Space'
import { useCheckUserAuthenticated } from 'modules/auth/hooks'
import useLazyGetSubTaskTemplateList from 'modules/task/features/TaskView/hooks/useLazyGetSubTaskTemplateList'
import { TaskDetailsModel } from 'modules/task/features/TaskView/models'
import { useTaskStatus, useTaskType } from 'modules/task/hooks'

import { ErrorResponse } from '../../../../../../../shared/services/api'
import handleSetFieldsErrors from '../../../../../../../shared/utils/form/handleSetFieldsErrors'
import useCreateSubTask from '../../../hooks/useCreateSubTask'
import {
  CreateSubTaskFormErrors,
  CreateSubTaskModalProps,
} from '../../CreateSubTaskModal/interfaces'

const CreateSubTaskModal = React.lazy(() => import('../../CreateSubTaskModal'))

const { Title } = Typography

export type SubTaskListTabProps = Pick<
  TaskDetailsModel,
  'assignee' | 'status' | 'type' | 'recordId' | 'title' | 'description'
> & {
  taskId: TaskDetailsModel['id']
}

const SubTaskListTab: FC<SubTaskListTabProps> = ({
  taskId,
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

  const {
    fn: createSubTask,
    state: { isLoading: createSubTaskIsLoading },
  } = useCreateSubTask()

  const [modalOpened, { toggle: toggleOpenModal }] = useBoolean(false)

  const taskType = useTaskType(type)
  const taskStatus = useTaskStatus(status)
  const currentUserIsAssignee = useCheckUserAuthenticated(assignee?.id)

  const handleCreateSubTask = useCallback<CreateSubTaskModalProps['onSubmit']>(
    async (values, setFields) => {
      try {
        await createSubTask({ taskId, ...values })
      } catch (exception) {
        const error = exception as ErrorResponse<CreateSubTaskFormErrors>
        handleSetFieldsErrors(error, setFields)
      }
    },
    [createSubTask, taskId],
  )

  useEffect(() => {
    if (modalOpened) {
      ;(async () => {
        await getTemplateList()
      })()
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
              <Button type='link' onClick={toggleOpenModal}>
                + Создать новое задание
              </Button>
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
            isLoading={createSubTaskIsLoading}
            onSubmit={handleCreateSubTask}
            onCancel={toggleOpenModal}
          />
        </React.Suspense>
      )}
    </Space>
  )
}

export default SubTaskListTab
