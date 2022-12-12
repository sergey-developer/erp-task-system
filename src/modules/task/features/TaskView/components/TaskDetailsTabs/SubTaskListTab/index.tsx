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
import useReworkSubTask from 'modules/task/features/TaskView/hooks/useReworkSubTask'
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
import {
  ReworkSubTaskFormErrors,
  ReworkSubTaskModalProps,
} from '../../ReworkSubTaskModal/interfaces'
import SubTaskList from './SubTaskList'

const CreateSubTaskModal = React.lazy(() => import('../../CreateSubTaskModal'))
const CancelSubTaskModal = React.lazy(() => import('../../CancelSubTaskModal'))
const ReworkSubTaskModal = React.lazy(() => import('../../ReworkSubTaskModal'))

const { Title } = Typography

export type SubTaskListTabProps = {
  task: Pick<
    TaskDetailsModel,
    | 'id'
    | 'assignee'
    | 'status'
    | 'type'
    | 'recordId'
    | 'title'
    | 'description'
    | 'parentTask'
  >
}

const SubTaskListTab: FC<SubTaskListTabProps> = ({ task }) => {
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
  } = useGetSubTaskList(task.id)

  const {
    fn: cancelSubTask,
    state: { isLoading: cancelSubTaskIsLoading },
  } = useCancelSubTask()

  const {
    fn: reworkSubTask,
    state: { isLoading: reworkSubTaskIsLoading },
  } = useReworkSubTask()

  const [subTaskId, setSubTaskId] = useState<SubTaskModel['id']>()

  const [createSubTaskModalOpened, { toggle: toggleCreateSubTaskModalOpened }] =
    useBoolean(false)
  const debouncedToggleCreateSubTaskModalOpened = useDebounceFn(
    toggleCreateSubTaskModalOpened,
  )

  const [cancelSubTaskModalOpened, { toggle: toggleCancelSubTaskModalOpened }] =
    useBoolean(false)
  const debouncedToggleCancelSubTaskModalOpened = useDebounceFn(
    toggleCancelSubTaskModalOpened,
  )

  const [reworkSubTaskModalOpened, { toggle: toggleReworkSubTaskModalOpened }] =
    useBoolean(false)
  const debouncedToggleReworkSubTaskModalOpened = useDebounceFn(
    toggleReworkSubTaskModalOpened,
  )

  const taskType = useTaskType(task.type)
  const taskStatus = useTaskStatus(task.status)
  const currentUserIsAssignee = useCheckUserAuthenticated(task.assignee?.id)

  const handleCreateSubTask = useCallback<CreateSubTaskModalProps['onSubmit']>(
    async ({ title, description, template }, setFields) => {
      try {
        await createSubTask({
          taskId: task.id,
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
    [createSubTask, task.id, toggleCreateSubTaskModalOpened],
  )

  const handleClickCancel = useCallback(
    (id: SubTaskModel['id']) => {
      setSubTaskId(id)
      debouncedToggleCancelSubTaskModalOpened()
    },
    [debouncedToggleCancelSubTaskModalOpened],
  )

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

  const handleClickRework = useCallback(
    (id: SubTaskModel['id']) => {
      setSubTaskId(id)
      debouncedToggleReworkSubTaskModalOpened()
    },
    [debouncedToggleReworkSubTaskModalOpened],
  )

  const handleReworkSubTask: ReworkSubTaskModalProps['onSubmit'] =
    useDebounceFn(
      async ({ returnReason }, setFields) => {
        if (!subTaskId) return

        try {
          await reworkSubTask({
            taskId: subTaskId,
            returnReason: returnReason.trim(),
          })

          toggleReworkSubTaskModalOpened()
        } catch (exception) {
          const error = exception as ErrorResponse<ReworkSubTaskFormErrors>
          handleSetFieldsErrors(error, setFields)
        }
      },
      [reworkSubTask, subTaskId, toggleReworkSubTaskModalOpened],
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
          task={task}
          list={subTaskList}
          isError={isGetSubTaskListError}
          onClickCancel={handleClickCancel}
          onClickRework={handleClickRework}
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
            initialFormValues={{
              title: task.title,
              description: task.description,
            }}
            recordId={task.recordId}
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
            recordId={task.recordId}
            isLoading={cancelSubTaskIsLoading}
            onSubmit={handleCancelSubTask}
            onCancel={debouncedToggleCancelSubTaskModalOpened}
          />
        </React.Suspense>
      )}

      {reworkSubTaskModalOpened && (
        <React.Suspense
          fallback={
            <ModalFallback
              visible={reworkSubTaskModalOpened}
              onCancel={debouncedToggleReworkSubTaskModalOpened}
            />
          }
        >
          <ReworkSubTaskModal
            recordId={task.recordId}
            isLoading={reworkSubTaskIsLoading}
            onSubmit={handleReworkSubTask}
            onCancel={debouncedToggleReworkSubTaskModalOpened}
          />
        </React.Suspense>
      )}
    </Space>
  )
}

export default SubTaskListTab
