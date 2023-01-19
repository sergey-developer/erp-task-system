import { useBoolean } from 'ahooks'
import { Button, Col, FormInstance, Row, Typography } from 'antd'
import get from 'lodash/get'
import React, { FC } from 'react'

import ModalFallback from 'components/Modals/ModalFallback'
import Permissions from 'components/Permissions'
import Space from 'components/Space'
import {
  TaskFirstLineFormFields,
  TaskFirstLineModalProps,
} from 'modules/task/features/TaskCard/TaskFirstLineModal/interfaces'
import { TaskSecondLineModalProps } from 'modules/task/features/TaskCard/TaskSecondLineModal'
import { useTaskExtendedStatus, useTaskStatus } from 'modules/task/hooks'
import { TaskModel } from 'modules/task/models'
import { taskWorkGroupPermissions } from 'modules/task/permissions'
import { WorkGroupListItemModel } from 'modules/workGroup/models'
import { useDebounceFn } from 'shared/hooks'

const TaskFirstLineModal = React.lazy(
  () => import('modules/task/features/TaskCard/TaskFirstLineModal'),
)

const TaskSecondLineModal = React.lazy(
  () => import('modules/task/features/TaskCard/TaskSecondLineModal'),
)

const { Text } = Typography

export type WorkGroupBlockProps = Pick<
  TaskModel,
  'id' | 'recordId' | 'workGroup' | 'status' | 'extendedStatus'
> & {
  hasSuspendRequest: boolean

  workGroupList: Array<WorkGroupListItemModel>
  workGroupListIsLoading: boolean

  transferTaskToFirstLine: (
    values: TaskFirstLineFormFields,
    setFields: FormInstance['setFields'],
    closeTaskFirstLineModal: () => void,
  ) => Promise<void>
  transferTaskToFirstLineIsLoading: boolean

  transferTaskToSecondLine: (
    workGroup: WorkGroupListItemModel['id'],
    closeTaskSecondLineModal: () => void,
  ) => Promise<void>
  transferTaskToSecondLineIsLoading: boolean
}

const WorkGroupBlock: FC<WorkGroupBlockProps> = ({
  id,
  recordId,
  hasSuspendRequest,

  workGroup,

  status,
  extendedStatus,

  workGroupList,
  workGroupListIsLoading,

  transferTaskToFirstLine,
  transferTaskToFirstLineIsLoading,
  transferTaskToSecondLine,
  transferTaskToSecondLineIsLoading,
}) => {
  const [isTaskFirstLineModalOpened, { toggle: toggleOpenTaskFirstLineModal }] =
    useBoolean(false)

  const [
    isTaskSecondLineModalOpened,
    { toggle: toggleOpenTaskSecondLineModal },
  ] = useBoolean(false)

  const taskStatus = useTaskStatus(status)
  const taskExtendedStatus = useTaskExtendedStatus(extendedStatus)
  const hasWorkGroup: boolean = !!workGroup

  const debouncedToggleOpenTaskSecondLineModal = useDebounceFn(
    toggleOpenTaskSecondLineModal,
  )

  const debouncedToggleOpenTaskFirstLineModal = useDebounceFn(
    toggleOpenTaskFirstLineModal,
  )

  const handleTransferTaskToSecondLine: TaskSecondLineModalProps['onSubmit'] =
    async (workGroupId) => {
      await transferTaskToSecondLine(workGroupId, toggleOpenTaskSecondLineModal)
    }

  const handleTransferTaskToFirstLine: TaskFirstLineModalProps['onSubmit'] =
    async (values, setFields) => {
      await transferTaskToFirstLine(
        values,
        setFields,
        toggleOpenTaskFirstLineModal,
      )
    }

  return (
    <>
      <Space data-testid='task-work-group' direction='vertical' $block>
        <Row justify='space-between'>
          <Col>
            <Text type='secondary'>Рабочая группа</Text>
          </Col>

          <Col>
            <Permissions config={taskWorkGroupPermissions.transferFirstLineBtn}>
              {() =>
                hasWorkGroup &&
                !taskStatus.isClosed &&
                !taskStatus.isCompleted ? (
                  <Button
                    type='link'
                    onClick={debouncedToggleOpenTaskFirstLineModal}
                    loading={transferTaskToFirstLineIsLoading}
                    disabled={
                      taskStatus.isAwaiting ||
                      taskExtendedStatus.isInReclassification ||
                      hasSuspendRequest
                    }
                  >
                    Вернуть на I линию
                  </Button>
                ) : null
              }
            </Permissions>

            <Permissions
              config={taskWorkGroupPermissions.transferSecondLineBtn}
            >
              {() =>
                hasWorkGroup ? null : (
                  <Button
                    type='link'
                    onClick={debouncedToggleOpenTaskSecondLineModal}
                    loading={transferTaskToSecondLineIsLoading}
                    disabled={
                      taskExtendedStatus.isInReclassification ||
                      (!taskStatus.isNew && !taskStatus.isInProgress) ||
                      hasSuspendRequest
                    }
                  >
                    Перевести на II линию
                  </Button>
                )
              }
            </Permissions>
          </Col>
        </Row>

        <Text>{get(workGroup, 'name', 'I линия поддержки')}</Text>
      </Space>

      {isTaskFirstLineModalOpened && (
        <React.Suspense
          fallback={
            <ModalFallback
              visible={isTaskFirstLineModalOpened}
              onCancel={toggleOpenTaskFirstLineModal}
            />
          }
        >
          <TaskFirstLineModal
            recordId={recordId}
            isLoading={transferTaskToFirstLineIsLoading}
            onSubmit={handleTransferTaskToFirstLine}
            onCancel={debouncedToggleOpenTaskFirstLineModal}
          />
        </React.Suspense>
      )}

      {isTaskSecondLineModalOpened && (
        <React.Suspense
          fallback={
            <ModalFallback
              visible={isTaskSecondLineModalOpened}
              onCancel={toggleOpenTaskSecondLineModal}
            />
          }
        >
          <TaskSecondLineModal
            id={id}
            onCancel={debouncedToggleOpenTaskSecondLineModal}
            workGroupList={workGroupList}
            workGroupListIsLoading={workGroupListIsLoading}
            onSubmit={handleTransferTaskToSecondLine}
            isLoading={transferTaskToSecondLineIsLoading}
          />
        </React.Suspense>
      )}
    </>
  )
}

export default WorkGroupBlock
