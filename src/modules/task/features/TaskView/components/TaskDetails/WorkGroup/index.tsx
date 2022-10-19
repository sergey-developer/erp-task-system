import { useBoolean } from 'ahooks'
import { Button, Col, FormInstance, Row, Typography } from 'antd'
import React, { FC } from 'react'

import ModalFallback from 'components/Modals/ModalFallback'
import Permissions from 'components/Permissions'
import Space from 'components/Space'
import {
  TaskFirstLineFormFields,
  TaskFirstLineModalProps,
} from 'modules/task/features/TaskView/components/TaskFirstLineModal/interfaces'
import TaskSecondLineModal, {
  TaskSecondLineModalProps,
} from 'modules/task/features/TaskView/components/TaskSecondLineModal'
import { TaskDetailsModel } from 'modules/task/features/TaskView/models'
import { taskWorkGroupPermissions } from 'modules/task/features/TaskView/permissions/taskWorkGroup.permissions'
import useTaskExtendedStatus from 'modules/task/hooks/useTaskExtendedStatus'
import useTaskStatus from 'modules/task/hooks/useTaskStatus'
import { WorkGroupListItemModel } from 'modules/workGroup/features/WorkGroupList/models'
import useDebounceFn from 'shared/hooks/useDebounceFn'
import valueOr from 'shared/utils/common/valueOr'

const TaskFirstLineModal = React.lazy(
  () => import('modules/task/features/TaskView/components/TaskFirstLineModal'),
)

const { Text } = Typography

export type WorkGroupProps = Pick<
  TaskDetailsModel,
  'id' | 'recordId' | 'workGroup' | 'status' | 'extendedStatus'
> & {
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

  hasReclassificationRequest: boolean
}

const WorkGroup: FC<WorkGroupProps> = ({
  id,
  recordId,

  workGroup,

  status,
  extendedStatus,

  workGroupList,
  workGroupListIsLoading,

  transferTaskToFirstLine,
  transferTaskToFirstLineIsLoading,
  transferTaskToSecondLine,
  transferTaskToSecondLineIsLoading,

  hasReclassificationRequest,
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
    async (workGroup) => {
      await transferTaskToSecondLine(workGroup, toggleOpenTaskSecondLineModal)
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
      <Space direction='vertical' $block>
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
                    disabled={hasReclassificationRequest}
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
                      !(
                        taskStatus.isNew ||
                        taskStatus.isInProgress ||
                        taskExtendedStatus.isAwaiting
                      ) || hasReclassificationRequest
                    }
                  >
                    Перевести на II линию
                  </Button>
                )
              }
            </Permissions>
          </Col>
        </Row>

        <Text>{valueOr(workGroup?.name, 'I линия поддержки')}</Text>
      </Space>

      {isTaskSecondLineModalOpened && (
        <TaskSecondLineModal
          id={id}
          onCancel={debouncedToggleOpenTaskSecondLineModal}
          workGroupList={workGroupList}
          workGroupListIsLoading={workGroupListIsLoading}
          onSubmit={handleTransferTaskToSecondLine}
          isLoading={transferTaskToSecondLineIsLoading}
        />
      )}

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
    </>
  )
}

export default WorkGroup
