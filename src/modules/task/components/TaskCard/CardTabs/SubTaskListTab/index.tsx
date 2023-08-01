import { useBoolean } from 'ahooks'
import { Button, Col, Row, Typography } from 'antd'
import React, { FC, useCallback, useState } from 'react'

import { useCheckUserAuthenticated } from 'modules/auth/hooks'
import { CancelSubTaskModalProps } from 'modules/subTask/components/CancelSubTaskModal/types'
import { ReworkSubTaskModalProps } from 'modules/subTask/components/ReworkSubTaskModal/types'
import SubTaskList from 'modules/subTask/components/SubTaskList'
import {
  useCancelSubTask,
  useGetSubTaskList,
  useReworkSubTask,
} from 'modules/subTask/hooks'
import { SubTaskModel } from 'modules/subTask/models'
import {
  useTaskExtendedStatus,
  useTaskStatus,
  useTaskType,
} from 'modules/task/hooks'
import { TaskModel } from 'modules/task/models'

import LoadingArea from 'components/LoadingArea'
import ModalFallback from 'components/Modals/ModalFallback'
import Space from 'components/Space'

import { useDebounceFn } from 'shared/hooks'
import { isBadRequestError, isErrorResponse } from 'shared/services/api'
import { getFieldsErrors } from 'shared/utils/form'

const CreateSubTaskModal = React.lazy(
  () => import('modules/subTask/components/CreateSubTaskModal'),
)
const CancelSubTaskModal = React.lazy(
  () => import('modules/subTask/components/CancelSubTaskModal'),
)
const ReworkSubTaskModal = React.lazy(
  () => import('modules/subTask/components/ReworkSubTaskModal'),
)

const { Title } = Typography

export type SubTaskListTabProps = {
  task: Pick<
    TaskModel,
    | 'id'
    | 'assignee'
    | 'status'
    | 'extendedStatus'
    | 'type'
    | 'recordId'
    | 'title'
    | 'description'
    | 'suspendRequest'
  >
}

const SubTaskListTab: FC<SubTaskListTabProps> = ({ task }) => {
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

  const [subTask, setSubTask] = useState<SubTaskModel>()

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
  const taskExtendedStatus = useTaskExtendedStatus(task.extendedStatus)
  const currentUserIsTaskAssignee = useCheckUserAuthenticated(task.assignee?.id)
  const taskHasSuspendRequest = !!task.suspendRequest

  const handleClickCancel = useCallback(
    (subTask: SubTaskModel) => {
      setSubTask(subTask)
      debouncedToggleCancelSubTaskModalOpened()
    },
    [setSubTask, debouncedToggleCancelSubTaskModalOpened],
  )

  const handleCancelSubTask = useDebounceFn<
    CancelSubTaskModalProps['onSubmit']
  >(
    async ({ cancelReason }, setFields) => {
      if (!subTask) return

      try {
        await cancelSubTask({
          taskId: task.id,
          subTaskId: subTask.id,
          cancelReason: cancelReason.trim(),
        })

        toggleCancelSubTaskModalOpened()
      } catch (error) {
        if (isErrorResponse(error)) {
          if (isBadRequestError(error)) {
            setFields(getFieldsErrors(error.data))
          }
        }
      }
    },
    [cancelSubTask, subTask, task.id, toggleCancelSubTaskModalOpened],
  )

  const handleClickRework = useCallback(
    (subTask: SubTaskModel) => {
      setSubTask(subTask)
      debouncedToggleReworkSubTaskModalOpened()
    },
    [setSubTask, debouncedToggleReworkSubTaskModalOpened],
  )

  const handleReworkSubTask = useDebounceFn<
    ReworkSubTaskModalProps['onSubmit']
  >(
    async ({ returnReason }, setFields) => {
      if (!subTask) return

      try {
        await reworkSubTask({
          taskId: task.id,
          subTaskId: subTask.id,
          returnReason: returnReason.trim(),
        })

        toggleReworkSubTaskModalOpened()
      } catch (error) {
        if (isErrorResponse(error)) {
          if (isBadRequestError(error)) {
            setFields(getFieldsErrors(error.data))
          }
        }
      }
    },
    [reworkSubTask, subTask, task.id, toggleReworkSubTaskModalOpened],
  )

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
              ) ||
              taskHasSuspendRequest ||
              taskExtendedStatus.isInReclassification
            }
          >
            + Создать новое задание
          </Button>
        </Col>
      </Row>

      <LoadingArea
        data-testid='sub-task-list-loading'
        isLoading={subTaskListIsLoading}
      >
        <SubTaskList
          taskStatus={task.status}
          taskExtendedStatus={task.extendedStatus}
          currentUserIsTaskAssignee={currentUserIsTaskAssignee}
          list={subTaskList}
          isError={isGetSubTaskListError}
          onClickCancel={handleClickCancel}
          onClickRework={handleClickRework}
          taskSuspendRequestStatus={task.suspendRequest?.status}
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
            task={task}
            onCancel={debouncedToggleCreateSubTaskModalOpened}
          />
        </React.Suspense>
      )}

      {cancelSubTaskModalOpened && subTask && (
        <React.Suspense
          fallback={
            <ModalFallback
              visible={cancelSubTaskModalOpened}
              onCancel={debouncedToggleCancelSubTaskModalOpened}
            />
          }
        >
          <CancelSubTaskModal
            recordId={subTask.recordId}
            isLoading={cancelSubTaskIsLoading}
            onSubmit={handleCancelSubTask}
            onCancel={debouncedToggleCancelSubTaskModalOpened}
          />
        </React.Suspense>
      )}

      {reworkSubTaskModalOpened && subTask && (
        <React.Suspense
          fallback={
            <ModalFallback
              visible={reworkSubTaskModalOpened}
              onCancel={debouncedToggleReworkSubTaskModalOpened}
            />
          }
        >
          <ReworkSubTaskModal
            recordId={subTask.recordId}
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
