import { useBoolean } from 'ahooks'
import { Button, Col, Row, Typography } from 'antd'
import React, { FC, useCallback, useEffect, useState } from 'react'

import LoadingArea from 'components/LoadingArea'
import ModalFallback from 'components/Modals/ModalFallback'
import Space from 'components/Space'
import { useCheckUserAuthenticated } from 'modules/auth/hooks'
import useCancelSubTask from 'modules/task/features/TaskView/hooks/useCancelSubTask'
import useCreateSubTask from 'modules/task/features/TaskView/hooks/useCreateSubTask'
import useGetSubTaskList from 'modules/task/features/TaskView/hooks/useGetSubTaskList'
import useLazyGetSubTaskTemplateList from 'modules/task/features/TaskView/hooks/useLazyGetSubTaskTemplateList'
import {
  SubTaskModel,
  TaskDetailsModel,
} from 'modules/task/features/TaskView/models'
import { useTaskStatus, useTaskType } from 'modules/task/hooks'
import useDebounceFn from 'shared/hooks/useDebounceFn'
import { ErrorResponse } from 'shared/services/api'
import handleSetFieldsErrors from 'shared/utils/form/handleSetFieldsErrors'

import {
  CancelSubTaskFormErrors,
  CancelSubTaskModalProps,
} from '../../CancelSubTaskModal/interfaces'
import {
  CreateSubTaskFormErrors,
  CreateSubTaskModalProps,
} from '../../CreateSubTaskModal/interfaces'
import SubTaskList from './SubTaskList'

const CreateSubTaskModal = React.lazy(() => import('../../CreateSubTaskModal'))
const CancelSubTaskModal = React.lazy(() => import('../../CancelSubTaskModal'))

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

  const {
    isLoading: subTaskListIsLoading,
    currentData: subTaskList = [],
    isError: isGetSubTaskListError,
  } = useGetSubTaskList(taskId)

  const {
    fn: cancelSubTask,
    state: { isLoading: cancelSubTaskIsLoading },
  } = useCancelSubTask()

  const [createSubTaskModalOpened, { toggle: toggleCreateSubTaskModalOpened }] =
    useBoolean(false)

  const debouncedToggleCreateSubTaskModalOpened = useDebounceFn(
    toggleCreateSubTaskModalOpened,
  )

  const [subTaskId, setSubTaskId] = useState<SubTaskModel['id']>()
  const [cancelSubTaskModalOpened, { toggle: toggleCancelSubTaskModalOpened }] =
    useBoolean(false)

  const debouncedToggleCancelSubTaskModalOpened = useDebounceFn(
    toggleCancelSubTaskModalOpened,
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

  const handleClickCancel = (id: SubTaskModel['id']) => {
    setSubTaskId(id)
    debouncedToggleCancelSubTaskModalOpened()
  }

  const handleCancelSubTask: CancelSubTaskModalProps['onSubmit'] =
    useDebounceFn(
      async ({ cancelReason }, setFields) => {
        if (!subTaskId) return

        try {
          await cancelSubTask({
            taskId: subTaskId,
            cancelReason: cancelReason.trim(),
          })

          toggleCancelSubTaskModalOpened()
        } catch (exception) {
          const error = exception as ErrorResponse<CancelSubTaskFormErrors>
          handleSetFieldsErrors(error, setFields)
        }
      },
      [cancelSubTask, subTaskId, toggleCancelSubTaskModalOpened],
    )

  useEffect(() => {
    if (createSubTaskModalOpened) {
      ;(async () => {
        await getTemplateList()
      })()
    }
  }, [getTemplateList, createSubTaskModalOpened])

  return (
    <Space
      data-testid='subtask-list-tab'
      size='middle'
      direction='vertical'
      $block
    >
      <Row justify='space-between' align='middle'>
        <Col>
          <Title level={5}>
            {`Задания${!!subTaskList.length ? ` (${subTaskList.length})` : ''}`}
          </Title>
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

      <LoadingArea isLoading={subTaskListIsLoading}>
        <SubTaskList
          data={subTaskList}
          isError={isGetSubTaskListError}
          onClickCancel={handleClickCancel}
        />
      </LoadingArea>

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

      {cancelSubTaskModalOpened && (
        <React.Suspense
          fallback={
            <ModalFallback
              visible={cancelSubTaskModalOpened}
              onCancel={debouncedToggleCancelSubTaskModalOpened}
            />
          }
        >
          <CancelSubTaskModal
            recordId={recordId}
            isLoading={cancelSubTaskIsLoading}
            onSubmit={handleCancelSubTask}
            onCancel={debouncedToggleCancelSubTaskModalOpened}
          />
        </React.Suspense>
      )}
    </Space>
  )
}

export default SubTaskListTab
