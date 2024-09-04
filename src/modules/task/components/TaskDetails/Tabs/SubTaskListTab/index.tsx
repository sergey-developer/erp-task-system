import { useBoolean } from 'ahooks'
import { Button, Col, Row, Typography } from 'antd'
import React, { FC, useCallback, useState } from 'react'

import { useIdBelongAuthUser } from 'modules/auth/hooks'
import { CancelSubTaskModalProps } from 'modules/task/components/CancelSubTaskModal/types'
import { ReworkSubTaskModalProps } from 'modules/task/components/ReworkSubTaskModal/types'
import SubTaskList from 'modules/task/components/SubTaskList'
import { useCancelSubTask, useGetSubTaskList, useReworkSubTask } from 'modules/task/hooks/subTask'
import { useTaskExtendedStatus, useTaskStatus, useTaskType } from 'modules/task/hooks/task'
import { SubTaskModel, TaskModel } from 'modules/task/models'
import { UserActionsModel } from 'modules/user/models'
import { MatchedUserPermissions } from 'modules/user/types'

import LoadingArea from 'components/LoadingArea'
import ModalFallback from 'components/Modals/ModalFallback'
import Space from 'components/Space'

import { useDebounceFn } from 'shared/hooks/useDebounceFn'
import { isBadRequestError, isErrorResponse } from 'shared/services/baseApi'
import { getTextWithCounter } from 'shared/utils/common'
import { getFieldsErrors } from 'shared/utils/form'

const CreateSubTaskModal = React.lazy(() => import('modules/task/components/CreateSubTaskModal'))
const CancelSubTaskModal = React.lazy(() => import('modules/task/components/CancelSubTaskModal'))
const ReworkSubTaskModal = React.lazy(() => import('modules/task/components/ReworkSubTaskModal'))

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
} & {
  userActions: UserActionsModel
  permissions: MatchedUserPermissions
}

const SubTaskListTab: FC<SubTaskListTabProps> = ({ task, userActions, permissions }) => {
  const {
    isLoading: subTaskListIsLoading,
    currentData: subTaskList = [],
    isError: isGetSubTaskListError,
  } = useGetSubTaskList({ taskId: task.id })

  const [cancelSubTask, { isLoading: cancelSubTaskIsLoading }] = useCancelSubTask()
  const [reworkSubTask, { isLoading: reworkSubTaskIsLoading }] = useReworkSubTask()

  const [subTask, setSubTask] = useState<SubTaskModel>()

  const [createSubTaskModalOpened, { toggle: toggleCreateSubTaskModalOpened }] = useBoolean(false)
  const debouncedToggleCreateSubTaskModalOpened = useDebounceFn(toggleCreateSubTaskModalOpened)

  const [cancelSubTaskModalOpened, { toggle: toggleCancelSubTaskModalOpened }] = useBoolean(false)
  const debouncedToggleCancelSubTaskModalOpened = useDebounceFn(toggleCancelSubTaskModalOpened)

  const [reworkSubTaskModalOpened, { toggle: toggleReworkSubTaskModalOpened }] = useBoolean(false)
  const debouncedToggleReworkSubTaskModalOpened = useDebounceFn(toggleReworkSubTaskModalOpened)

  const taskType = useTaskType(task.type)
  const taskStatus = useTaskStatus(task.status)
  const taskExtendedStatus = useTaskExtendedStatus(task.extendedStatus)
  const currentUserIsTaskAssignee = useIdBelongAuthUser(task.assignee?.id)
  const taskHasSuspendRequest = !!task.suspendRequest

  const onClickCancel = useCallback(
    (subTask: SubTaskModel) => {
      setSubTask(subTask)
      debouncedToggleCancelSubTaskModalOpened()
    },
    [setSubTask, debouncedToggleCancelSubTaskModalOpened],
  )

  const onCancelSubTask = useDebounceFn<CancelSubTaskModalProps['onSubmit']>(
    async ({ cancelReason }, setFields) => {
      if (!subTask) return

      try {
        await cancelSubTask({
          taskId: task.id,
          subTaskId: subTask.id,
          cancelReason: cancelReason.trim(),
        }).unwrap()

        toggleCancelSubTaskModalOpened()
      } catch (error) {
        if (isErrorResponse(error) && isBadRequestError(error)) {
          setFields(getFieldsErrors(error.data))
        }
      }
    },
    [cancelSubTask, subTask, task.id, toggleCancelSubTaskModalOpened],
  )

  const onClickRework = useCallback(
    (subTask: SubTaskModel) => {
      setSubTask(subTask)
      debouncedToggleReworkSubTaskModalOpened()
    },
    [setSubTask, debouncedToggleReworkSubTaskModalOpened],
  )

  const onReworkSubTask = useDebounceFn<ReworkSubTaskModalProps['onSubmit']>(
    async ({ returnReason }, setFields) => {
      if (!subTask) return

      try {
        await reworkSubTask({
          taskId: task.id,
          subTaskId: subTask.id,
          returnReason: returnReason.trim(),
        }).unwrap()

        toggleReworkSubTaskModalOpened()
      } catch (error) {
        if (isErrorResponse(error) && isBadRequestError(error)) {
          setFields(getFieldsErrors(error.data))
        }
      }
    },
    [reworkSubTask, subTask, task.id, toggleReworkSubTaskModalOpened],
  )

  return (
    <Space data-testid='subtask-list-tab' size='middle' direction='vertical' $block>
      <Row justify='space-between' align='middle'>
        <Col>
          <Title level={5}>{getTextWithCounter('Задания', subTaskList)}</Title>
        </Col>

        <Col>
          <Button
            type='link'
            onClick={debouncedToggleCreateSubTaskModalOpened}
            disabled={
              !(
                userActions.tasks.CAN_SUBTASKS_CREATE?.includes(task.id) &&
                taskStatus.isInProgress &&
                (taskType.isIncident || taskType.isRequest)
              ) ||
              taskHasSuspendRequest ||
              taskExtendedStatus.isInReclassification
            }
          >
            Создать новое задание
          </Button>
        </Col>
      </Row>

      <LoadingArea data-testid='sub-task-list-loading' isLoading={subTaskListIsLoading}>
        <SubTaskList
          taskStatus={task.status}
          taskExtendedStatus={task.extendedStatus}
          currentUserIsTaskAssignee={currentUserIsTaskAssignee}
          list={subTaskList}
          isError={isGetSubTaskListError}
          onClickCancel={onClickCancel}
          onClickRework={onClickRework}
          taskSuspendRequestStatus={task.suspendRequest?.status}
          permissions={permissions}
        />
      </LoadingArea>

      {createSubTaskModalOpened && (
        <React.Suspense
          fallback={
            <ModalFallback
              open={createSubTaskModalOpened}
              onCancel={debouncedToggleCreateSubTaskModalOpened}
            />
          }
        >
          <CreateSubTaskModal task={task} onCancel={debouncedToggleCreateSubTaskModalOpened} />
        </React.Suspense>
      )}

      {cancelSubTaskModalOpened && subTask && (
        <React.Suspense
          fallback={
            <ModalFallback
              open={cancelSubTaskModalOpened}
              onCancel={debouncedToggleCancelSubTaskModalOpened}
            />
          }
        >
          <CancelSubTaskModal
            recordId={subTask.recordId}
            isLoading={cancelSubTaskIsLoading}
            onSubmit={onCancelSubTask}
            onCancel={debouncedToggleCancelSubTaskModalOpened}
          />
        </React.Suspense>
      )}

      {reworkSubTaskModalOpened && subTask && (
        <React.Suspense
          fallback={
            <ModalFallback
              open={reworkSubTaskModalOpened}
              onCancel={debouncedToggleReworkSubTaskModalOpened}
            />
          }
        >
          <ReworkSubTaskModal
            recordId={subTask.recordId}
            isLoading={reworkSubTaskIsLoading}
            onSubmit={onReworkSubTask}
            onCancel={debouncedToggleReworkSubTaskModalOpened}
          />
        </React.Suspense>
      )}
    </Space>
  )
}

export default SubTaskListTab
