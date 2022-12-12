import { useBoolean } from 'ahooks'
import { Button, Col, Row, Typography } from 'antd'
import React, { FC, useCallback, useEffect } from 'react'

import ModalFallback from 'components/Modals/ModalFallback'
import Space from 'components/Space'
import { useCheckUserAuthenticated } from 'modules/auth/hooks'
import useCreateSubTask from 'modules/task/features/TaskView/hooks/useCreateSubTask'
import useLazyGetSubTaskTemplateList from 'modules/task/features/TaskView/hooks/useLazyGetSubTaskTemplateList'
import { TaskDetailsModel } from 'modules/task/features/TaskView/models'
import { useTaskStatus, useTaskType } from 'modules/task/hooks'
import useDebounceFn from 'shared/hooks/useDebounceFn'
import { ErrorResponse } from 'shared/services/api'
import handleSetFieldsErrors from 'shared/utils/form/handleSetFieldsErrors'

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

  const [createSubTaskModalOpened, { toggle: toggleCreateSubTaskModalOpened }] =
    useBoolean(false)

  const debouncedToggleCreateSubTaskModalOpened = useDebounceFn(
    toggleCreateSubTaskModalOpened,
  )

  const taskType = useTaskType(type)
  const taskStatus = useTaskStatus(status)
  const currentUserIsAssignee = useCheckUserAuthenticated(assignee?.id)

  const handleCreateSubTask = useCallback<CreateSubTaskModalProps['onSubmit']>(
    async ({ title, description, template }, setFields) => {
      try {
        await createSubTask({
          taskId,
          title: title.trim(),
          description: description.trim(),
          template,
        })

        toggleCreateSubTaskModalOpened()
      } catch (exception) {
        const error = exception as ErrorResponse<CreateSubTaskFormErrors>
        handleSetFieldsErrors(error, setFields)
      }
    },
    [createSubTask, taskId, toggleCreateSubTaskModalOpened],
  )

  useEffect(() => {
    if (createSubTaskModalOpened) {
      ;(async () => {
        await getTemplateList()
      })()
    }
  }, [getTemplateList, createSubTaskModalOpened])

  return (
    <Space data-testid='subtask-list-tab' direction='vertical' $block>
      <Row justify='space-between' align='middle'>
        <Col>
          <Title level={5}>Задания</Title>
        </Col>

        <Col>
          <Button
            type='link'
            onClick={debouncedToggleCreateSubTaskModalOpened}
            disabled={
              !(
                currentUserIsAssignee &&
                taskStatus.isInProgress &&
                (taskType.isIncident || taskType.isRequest)
              )
            }
          >
            + Создать новое задание
          </Button>
        </Col>
      </Row>

      {createSubTaskModalOpened && (
        <React.Suspense
          fallback={
            <ModalFallback
              visible={createSubTaskModalOpened}
              onCancel={debouncedToggleCreateSubTaskModalOpened}
            />
          }
        >
          <CreateSubTaskModal
            initialFormValues={{ title, description }}
            recordId={recordId}
            templateOptions={templateList}
            templateOptionsIsLoading={templateListIsLoading}
            isLoading={createSubTaskIsLoading}
            onSubmit={handleCreateSubTask}
            onCancel={debouncedToggleCreateSubTaskModalOpened}
          />
        </React.Suspense>
      )}
    </Space>
  )
}

export default SubTaskListTab
