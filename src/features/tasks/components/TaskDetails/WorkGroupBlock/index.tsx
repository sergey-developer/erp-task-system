import { useBoolean } from 'ahooks'
import { Button, Col, Divider, FormInstance, Popover, Row, Typography } from 'antd'
import {
  TaskFirstLineFormFields,
  TaskFirstLineModalProps,
} from 'features/tasks/components/TaskFirstLineModal/types'
import {
  TaskSecondLineFormFields,
  TaskSecondLineModalProps,
} from 'features/tasks/components/TaskSecondLineModal/types'
import UserShortInfo from 'features/tasks/components/UserShortInfo'
import { useTaskStatus } from 'features/tasks/hooks'
import { TaskDetailDTO } from 'features/tasks/api/dto'
import { UserPermissionsEnum } from 'features/users/api/constants'
import { UserActionsDTO } from 'features/users/api/dto'
import { useUserPermissions } from 'features/users/hooks'
import React, { FC } from 'react'

import ModalFallback from 'components/Modals/ModalFallback'
import Space from 'components/Space'

import { useDebounceFn } from 'shared/hooks/useDebounceFn'
import { EmptyFn } from 'shared/types/utils'

const TaskFirstLineModal = React.lazy(() => import('features/tasks/components/TaskFirstLineModal'))
const TaskSecondLineModal = React.lazy(
  () => import('features/tasks/components/TaskSecondLineModal'),
)

const { Text } = Typography

export type WorkGroupBlockProps = Pick<TaskDetailDTO, 'id' | 'type' | 'recordId' | 'status'> & {
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

  userActions: UserActionsDTO

  workGroup?: TaskDetailDTO['workGroup']
}

// todo: перенести модалки в TaskDetails
const WorkGroupBlock: FC<WorkGroupBlockProps> = ({
  id,
  type,
  recordId,

  workGroup,

  status,

  transferTaskToFirstLine,
  transferTaskToFirstLineIsLoading,
  transferTaskToSecondLine,
  transferTaskToSecondLineIsLoading,

  userActions,
}) => {
  const permissions = useUserPermissions([
    UserPermissionsEnum.PutFirstLineTasksOnSecondLine,
    UserPermissionsEnum.ClassificationOfWorkTypes,
  ])

  const [isTaskFirstLineModalOpened, { toggle: toggleOpenTaskFirstLineModal }] = useBoolean(false)
  const debouncedToggleOpenTaskFirstLineModal = useDebounceFn(toggleOpenTaskFirstLineModal)

  const [isTaskSecondLineModalOpened, { toggle: toggleOpenTaskSecondLineModal }] = useBoolean(false)
  const debouncedToggleOpenTaskSecondLineModal = useDebounceFn(toggleOpenTaskSecondLineModal)

  const taskStatus = useTaskStatus(status)
  const hasWorkGroup = !!workGroup

  const onReturnTaskToSecondLine: TaskSecondLineModalProps['onSubmit'] = async (
    values,
    setFields,
  ) => {
    await transferTaskToSecondLine(values, setFields, toggleOpenTaskSecondLineModal)
  }

  const onReturnTaskToFirstLine: TaskFirstLineModalProps['onSubmit'] = async (
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
            {hasWorkGroup && !taskStatus.isClosed && !taskStatus.isCompleted && (
              <Button
                type='link'
                onClick={debouncedToggleOpenTaskFirstLineModal}
                loading={transferTaskToFirstLineIsLoading}
                disabled={!userActions.tasks.CAN_PUT_ON_FIRST_LINE?.includes(id)}
              >
                Вернуть на I линию
              </Button>
            )}

            {!hasWorkGroup && (
              <Button
                type='link'
                onClick={debouncedToggleOpenTaskSecondLineModal}
                loading={transferTaskToSecondLineIsLoading}
                disabled={!userActions.tasks.CAN_PUT_ON_SECOND_LINE?.includes(id)}
              >
                Перевести на II линию
              </Button>
            )}
          </Col>
        </Row>

        {workGroup ? (
          <Popover
            content={
              <Space direction='vertical'>
                <UserShortInfo
                  testId='user-short-info-group-lead'
                  title='Руководитель группы'
                  position={workGroup.groupLead.position}
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
                  position={workGroup.seniorEngineer.position}
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
            onSubmit={onReturnTaskToFirstLine}
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
            type={type}
            recordId={recordId}
            onCancel={debouncedToggleOpenTaskSecondLineModal}
            onSubmit={onReturnTaskToSecondLine}
            isLoading={transferTaskToSecondLineIsLoading}
            permissions={permissions}
          />
        </React.Suspense>
      )}
    </>
  )
}

export default WorkGroupBlock
