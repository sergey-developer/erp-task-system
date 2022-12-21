import { useBoolean } from 'ahooks'
import { Button, Col, Row, Typography } from 'antd'
import React, { FC, useCallback, useEffect, useState } from 'react'

import LoadingArea from 'components/LoadingArea'
import ModalFallback from 'components/Modals/ModalFallback'
import Space from 'components/Space'
import { useCheckUserAuthenticated } from 'modules/auth/hooks'
import {
  CancelSubTaskFormErrors,
  CancelSubTaskModalProps,
} from 'modules/subTask/features/CancelSubTaskModal/interfaces'
import {
  CreateSubTaskFormErrors,
  CreateSubTaskModalProps,
} from 'modules/subTask/features/CreateSubTaskModal/interfaces'
import {
  ReworkSubTaskFormErrors,
  ReworkSubTaskModalProps,
} from 'modules/subTask/features/ReworkSubTaskModal/interfaces'
import SubTaskList from 'modules/subTask/features/SubTaskList'
import {
  useCancelSubTask,
  useCreateSubTask,
  useGetSubTaskList,
  useLazyGetSubTaskTemplateList,
  useReworkSubTask,
} from 'modules/subTask/hooks'
import { SubTaskModel } from 'modules/subTask/models'
import { TaskDetailsModel } from 'modules/task/features/TaskView/models'
import { useTaskStatus, useTaskType } from 'modules/task/hooks'
import useDebounceFn from 'shared/hooks/useDebounceFn'
import { ErrorResponse } from 'shared/services/api'
import handleSetFieldsErrors from 'shared/utils/form/handleSetFieldsErrors'

const CreateSubTaskModal = React.lazy(
  () => import('modules/subTask/features/CreateSubTaskModal'),
)
const CancelSubTaskModal = React.lazy(
  () => import('modules/subTask/features/CancelSubTaskModal'),
)
const ReworkSubTaskModal = React.lazy(
  () => import('modules/subTask/features/ReworkSubTaskModal'),
)

const { Title } = Typography

export type SubTaskListTabProps = {
  task: Pick<
    TaskDetailsModel,
    'id' | 'assignee' | 'status' | 'type' | 'recordId' | 'title' | 'description'
  >
}

const SubTaskListTab: FC<SubTaskListTabProps> = ({ task }) => {
  const {
    fn: getTemplateList,
    state: {
      isFetching: templateListIsFetching,
      currentData: templateListResponse,
    },
  } = useLazyGetSubTaskTemplateList()

  const templateList = templateListResponse?.results || []

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
  const currentUserIsTaskAssignee = useCheckUserAuthenticated(task.assignee?.id)

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
            taskId: task.id,
            subTaskId,
            cancelReason: cancelReason.trim(),
          })

          toggleCancelSubTaskModalOpened()
        } catch (exception) {
          const error = exception as ErrorResponse<CancelSubTaskFormErrors>
          handleSetFieldsErrors(error, setFields)
        }
      },
      [cancelSubTask, subTaskId, task.id, toggleCancelSubTaskModalOpened],
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
                currentUserIsTaskAssignee &&
                taskStatus.isInProgress &&
                (taskType.isIncident || taskType.isRequest)
              )
            }
          >
            + Создать новое задание
          </Button>
        </Col>
      </Row>

      <LoadingArea
        data-testid='sub-task-list-spinner'
        isLoading={subTaskListIsLoading}
      >
        <SubTaskList
          taskStatus={task.status}
          currentUserIsTaskAssignee={currentUserIsTaskAssignee}
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
            templateOptionsIsLoading={templateListIsFetching}
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
