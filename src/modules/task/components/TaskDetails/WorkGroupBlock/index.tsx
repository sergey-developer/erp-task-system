import { useBoolean } from 'ahooks'
import { Button, Col, Divider, FormInstance, Popover, Row, Typography } from 'antd'
import React, { FC } from 'react'

import {
  TaskFirstLineFormFields,
  TaskFirstLineModalProps,
} from 'modules/task/components/TaskFirstLineModal/types'
import {
  TaskSecondLineFormFields,
  TaskSecondLineModalProps,
} from 'modules/task/components/TaskSecondLineModal/types'
import UserShortInfo from 'modules/task/components/UserShortInfo'
import { SuspendRequestStatusEnum } from 'modules/task/constants/taskSuspendRequest'
import { useTaskExtendedStatus, useTaskStatus } from 'modules/task/hooks/task'
import { useTaskSuspendRequestStatus } from 'modules/task/hooks/taskSuspendRequest'
import { TaskModel } from 'modules/task/models'
import { taskWorkGroupPermissions } from 'modules/task/permissions'

import ModalFallback from 'components/Modals/ModalFallback'
import Permissions from 'components/Permissions'
import Space from 'components/Space'

import { useDebounceFn } from 'shared/hooks/useDebounceFn'
import { EmptyFn } from 'shared/types/utils'

const TaskFirstLineModal = React.lazy(() => import('modules/task/components/TaskFirstLineModal'))

const TaskSecondLineModal = React.lazy(() => import('modules/task/components/TaskSecondLineModal'))

const { Text } = Typography

export type WorkGroupBlockProps = Pick<
  TaskModel,
  'id' | 'recordId' | 'status' | 'extendedStatus'
> & {
  transferTaskToFirstLine: (
    values: TaskFirstLineFormFields,
    setFields: FormInstance<TaskFirstLineFormFields>['setFields'],
    closeTaskFirstLineModal: EmptyFn,
  ) => Promise<void>
  transferTaskToFirstLineIsLoading: boolean

  transferTaskToSecondLine: (
    values: TaskSecondLineFormFields,
    setFields: FormInstance<TaskSecondLineFormFields>['setFields'],
    closeTaskSecondLineModal: EmptyFn,
  ) => Promise<void>
  transferTaskToSecondLineIsLoading: boolean

  taskSuspendRequestStatus?: SuspendRequestStatusEnum
  workGroup?: TaskModel['workGroup']
}

const WorkGroupBlock: FC<WorkGroupBlockProps> = ({
  id,
  recordId,

  workGroup,

  status,
  extendedStatus,

  transferTaskToFirstLine,
  transferTaskToFirstLineIsLoading,
  transferTaskToSecondLine,
  transferTaskToSecondLineIsLoading,

  taskSuspendRequestStatus: rawTaskSuspendRequestStatus,
}) => {
  const [isTaskFirstLineModalOpened, { toggle: toggleOpenTaskFirstLineModal }] = useBoolean(false)

  const [isTaskSecondLineModalOpened, { toggle: toggleOpenTaskSecondLineModal }] = useBoolean(false)

  const taskStatus = useTaskStatus(status)
  const taskExtendedStatus = useTaskExtendedStatus(extendedStatus)
  const taskSuspendRequestStatus = useTaskSuspendRequestStatus(rawTaskSuspendRequestStatus)

  const hasWorkGroup: boolean = !!workGroup

  const debouncedToggleOpenTaskSecondLineModal = useDebounceFn(toggleOpenTaskSecondLineModal)

  const debouncedToggleOpenTaskFirstLineModal = useDebounceFn(toggleOpenTaskFirstLineModal)

  const handleTransferTaskToSecondLine: TaskSecondLineModalProps['onSubmit'] = async (
    values,
    setFields,
  ) => {
    await transferTaskToSecondLine(values, setFields, toggleOpenTaskSecondLineModal)
  }

  const handleTransferTaskToFirstLine: TaskFirstLineModalProps['onSubmit'] = async (
    values,
    setFields,
  ) => {
    await transferTaskToFirstLine(values, setFields, toggleOpenTaskFirstLineModal)
  }

  return (
    <>
      <Space data-testid='task-work-group' direction='vertical' $block>
        <Row justify='space-between'>
          <Col>
            <Text type='secondary'>Рабочая группа</Text>
          </Col>

          <Col>
            <Permissions config={taskWorkGroupPermissions.transferToFirstLineBtn}>
              {() =>
                hasWorkGroup && !taskStatus.isClosed && !taskStatus.isCompleted ? (
                  <Button
                    type='link'
                    onClick={debouncedToggleOpenTaskFirstLineModal}
                    loading={transferTaskToFirstLineIsLoading}
                    disabled={
                      taskSuspendRequestStatus.isApproved
                        ? false
                        : taskSuspendRequestStatus.isNew ||
                          taskSuspendRequestStatus.isInProgress ||
                          taskStatus.isAwaiting ||
                          taskExtendedStatus.isInReclassification
                    }
                  >
                    Вернуть на I линию
                  </Button>
                ) : null
              }
            </Permissions>

            <Permissions config={taskWorkGroupPermissions.transferToSecondLineBtn}>
              {() =>
                hasWorkGroup ? null : (
                  <Button
                    type='link'
                    onClick={debouncedToggleOpenTaskSecondLineModal}
                    loading={transferTaskToSecondLineIsLoading}
                    disabled={
                      taskSuspendRequestStatus.isApproved
                        ? false
                        : taskSuspendRequestStatus.isNew ||
                          taskSuspendRequestStatus.isInProgress ||
                          taskExtendedStatus.isInReclassification ||
                          (!taskStatus.isNew && !taskStatus.isInProgress)
                    }
                  >
                    Перевести на II линию
                  </Button>
                )
              }
            </Permissions>
          </Col>
        </Row>

        {workGroup ? (
          <Popover
            content={
              <Space direction='vertical'>
                <UserShortInfo
                  testId='user-short-info-group-lead'
                  title='Руководитель группы'
                  role={workGroup.groupLead.role}
                  phone={workGroup.groupLead.phone}
                  email={workGroup.groupLead.email}
                  firstName={workGroup.groupLead.firstName}
                  lastName={workGroup.groupLead.lastName}
                  middleName={workGroup.groupLead.middleName}
                />

                <Divider />

                <UserShortInfo
                  testId='user-short-info-senior-engineer'
                  title='Старший инженер группы'
                  role={workGroup.seniorEngineer.role}
                  phone={workGroup.seniorEngineer.phone}
                  email={workGroup.seniorEngineer.email}
                  firstName={workGroup.seniorEngineer.firstName}
                  lastName={workGroup.seniorEngineer.lastName}
                  middleName={workGroup.seniorEngineer.middleName}
                />
              </Space>
            }
          >
            <Text>{workGroup.name}</Text>
          </Popover>
        ) : (
          <Text>I линия поддержки</Text>
        )}
      </Space>

      {isTaskFirstLineModalOpened && (
        <React.Suspense
          fallback={
            <ModalFallback
              open={isTaskFirstLineModalOpened}
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
              open={isTaskSecondLineModalOpened}
              onCancel={toggleOpenTaskSecondLineModal}
            />
          }
        >
          <TaskSecondLineModal
            id={id}
            recordId={recordId}
            onCancel={debouncedToggleOpenTaskSecondLineModal}
            onSubmit={handleTransferTaskToSecondLine}
            isLoading={transferTaskToSecondLineIsLoading}
          />
        </React.Suspense>
      )}
    </>
  )
}

export default WorkGroupBlock
