import { useBoolean } from 'ahooks'
import { Button, Col, Row, Typography } from 'antd'
import React, { FC, useCallback } from 'react'

import Permissions from 'components/Permissions'
import Space from 'components/Space'
import {
  TaskFirstLineFormErrors,
  TaskFirstLineModalProps,
} from 'modules/task/features/TaskView/components/TaskFirstLineModal/interfaces'
import TaskSecondLineModal from 'modules/task/features/TaskView/components/TaskSecondLineModal'
import { TaskDetailsModel } from 'modules/task/features/TaskView/models'
import { taskWorkGroupPermissions } from 'modules/task/features/TaskView/permissions/taskWorkGroup.permissions'
import useTaskExtendedStatus from 'modules/task/hooks/useTaskExtendedStatus'
import useTaskStatus from 'modules/task/hooks/useTaskStatus'
import { WorkGroupListItemModel } from 'modules/workGroup/features/WorkGroupList/models'
import useDebounceFn from 'shared/hooks/useDebounceFn'
import { ErrorResponse } from 'shared/services/api'
import valueOr from 'shared/utils/common/valueOr'
import handleSetFieldsErrors from 'shared/utils/form/handleSetFieldsErrors'

const TaskFirstLineModal = React.lazy(
  () => import('modules/task/features/TaskView/components/TaskFirstLineModal'),
)

const { Text } = Typography

type WorkGroupProps = Pick<
  TaskDetailsModel,
  'id' | 'recordId' | 'workGroup' | 'status' | 'extendedStatus'
> & {
  workGroupList: Array<WorkGroupListItemModel>
  workGroupListIsLoading: boolean

  transferTask: (
    workGroup: WorkGroupListItemModel['id'],
    closeTaskSecondLineModal: () => void,
  ) => Promise<void>
  transferTaskIsLoading: boolean

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

  transferTask,
  transferTaskIsLoading,

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

  const handleTransferTask = async (
    workGroup: WorkGroupListItemModel['id'],
  ): Promise<void> => {
    await transferTask(workGroup, debouncedToggleOpenTaskSecondLineModal)
  }

  const handleReturnTask = useCallback<TaskFirstLineModalProps['onSubmit']>(
    async (values, setFields) => {
      try {
        // await createReclassificationRequest({
        //   id,
        //   ...values,
        // })
        debouncedToggleOpenTaskFirstLineModal()
      } catch (exception) {
        const error = exception as ErrorResponse<TaskFirstLineFormErrors>
        handleSetFieldsErrors(error, setFields)
      }
    },
    [debouncedToggleOpenTaskFirstLineModal],
  )

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
                hasWorkGroup ? (
                  <Button
                    type='link'
                    onClick={debouncedToggleOpenTaskFirstLineModal}
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
                    loading={transferTaskIsLoading}
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
          onTransfer={handleTransferTask}
          transferTaskIsLoading={transferTaskIsLoading}
        />
      )}

      {isTaskFirstLineModalOpened && (
        <React.Suspense>
          <TaskFirstLineModal
            recordId={recordId}
            isLoading={false}
            onSubmit={handleReturnTask}
            onCancel={debouncedToggleOpenTaskFirstLineModal}
          />
        </React.Suspense>
      )}
    </>
  )
}

export default WorkGroup
