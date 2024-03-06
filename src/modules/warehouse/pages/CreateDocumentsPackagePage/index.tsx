import { useBoolean } from 'ahooks'
import { Button, Flex, Typography } from 'antd'
import get from 'lodash/get'
import React, { FC } from 'react'
import { useLocation } from 'react-router-dom'

import { CreateCallingReasonModalProps } from 'modules/task/components/CreateCallingReasonModal/types'
import { CreateCompletedWorkModalProps } from 'modules/task/components/CreateCompletedWorkModal/types'
import {
  useCreateCompletedWork,
  useCreateInitiationReason,
  useDeleteCompletedWork,
  useDeleteInitiationReason,
  useGetTaskCompletionDocuments,
} from 'modules/task/hooks/task'
import { TaskModel } from 'modules/task/models'
import CallingReasonsTable from 'modules/warehouse/components/CallingReasonsTable'
import CompletedWorkTable from 'modules/warehouse/components/CompletedWorkTable'
import { useGetMeasurementUnitList } from 'modules/warehouse/hooks/measurementUnit'

import ModalFallback from 'components/Modals/ModalFallback'

import { useDebounceFn } from 'shared/hooks/useDebounceFn'
import { isBadRequestError, isErrorResponse } from 'shared/services/baseApi'
import { IdType } from 'shared/types/common'
import { Nullable } from 'shared/types/utils'
import { getFieldsErrors } from 'shared/utils/form'

const CreateCallingReasonModal = React.lazy(
  () => import('modules/task/components/CreateCallingReasonModal'),
)

const CreateCompletedWorkModal = React.lazy(
  () => import('modules/task/components/CreateCompletedWorkModal'),
)

const { Title } = Typography

const CreateDocumentsPackagePage: FC = () => {
  const location = useLocation()
  const task: Nullable<Pick<TaskModel, 'id'>> = get(location, 'state.task')

  const [createReasonModalOpened, { toggle: toggleCreateReasonModal }] = useBoolean(false)
  const debouncedToggleCreateReasonModal = useDebounceFn(toggleCreateReasonModal)

  const [createCompletedWorkModalOpened, { toggle: toggleCreateCompletedWorkModal }] =
    useBoolean(false)
  const debouncedToggleCreateCompletedWorkModal = useDebounceFn(toggleCreateCompletedWorkModal)

  const { currentData: taskCompletionDocuments, isFetching: taskCompletionDocumentsIsFetching } =
    useGetTaskCompletionDocuments({ taskId: task?.id! }, { skip: !task?.id })

  const { currentData: measurementUnits = [], isFetching: measurementUnitsIsFetching } =
    useGetMeasurementUnitList(undefined, { skip: !createCompletedWorkModalOpened })

  const [createInitiationReasonMutation, { isLoading: createInitiationReasonIsLoading }] =
    useCreateInitiationReason()
  const [deleteInitiationReasonMutation] = useDeleteInitiationReason()

  const [createCompletedWorkMutation, { isLoading: createCompletedWorkIsLoading }] =
    useCreateCompletedWork()
  const [deleteCompletedWorkMutation] = useDeleteCompletedWork()

  const onDeleteInitiationReason = async (id: IdType) => {
    if (!task) return
    await deleteInitiationReasonMutation({ taskId: task.id, id })
  }

  const onDeleteCompletedWork = async (id: IdType) => {
    if (!task) return
    await deleteCompletedWorkMutation({ taskId: task.id, id })
  }

  const onCreateCallingReason: CreateCallingReasonModalProps['onSubmit'] = async (
    values,
    setFields,
  ) => {
    if (!task) return

    try {
      await createInitiationReasonMutation({ taskId: task.id, ...values }).unwrap()
      toggleCreateReasonModal()
    } catch (error) {
      if (isErrorResponse(error) && isBadRequestError(error)) {
        setFields(getFieldsErrors(error.data))
      }
    }
  }

  const onCreateCompletedWork: CreateCompletedWorkModalProps['onSubmit'] = async (
    values,
    setFields,
  ) => {
    if (!task) return

    try {
      await createCompletedWorkMutation({ taskId: task.id, ...values }).unwrap()
      toggleCreateCompletedWorkModal()
    } catch (error) {
      if (isErrorResponse(error) && isBadRequestError(error)) {
        setFields(getFieldsErrors(error.data))
      }
    }
  }

  return (
    <>
      <Flex data-testid='create-documents-package-page' vertical>
        <Flex vertical gap={112}>
          <Flex vertical gap='large'>
            <Title level={4}>Основные данные о выполненных работах</Title>

            {task && (
              <Flex vertical gap='small' align='start'>
                <Title level={5}>Причины вызова</Title>

                <CallingReasonsTable
                  loading={taskCompletionDocumentsIsFetching}
                  dataSource={taskCompletionDocuments?.initiationReasons || []}
                  onDelete={onDeleteInitiationReason}
                />

                <Button type='link' onClick={debouncedToggleCreateReasonModal}>
                  Добавить причину
                </Button>
              </Flex>
            )}

            {task && (
              <Flex vertical gap='small' align='start'>
                <Title level={5}>Перечень проведенных работ</Title>

                <CompletedWorkTable
                  loading={taskCompletionDocumentsIsFetching}
                  dataSource={taskCompletionDocuments?.workList || []}
                  onDelete={onDeleteCompletedWork}
                />

                <Button type='link' onClick={debouncedToggleCreateCompletedWorkModal}>
                  Добавить работы
                </Button>
              </Flex>
            )}
          </Flex>
        </Flex>
      </Flex>

      {createReasonModalOpened && (
        <React.Suspense
          fallback={<ModalFallback open onCancel={debouncedToggleCreateReasonModal} />}
        >
          <CreateCallingReasonModal
            open={createReasonModalOpened}
            onCancel={debouncedToggleCreateReasonModal}
            onSubmit={onCreateCallingReason}
            confirmLoading={createInitiationReasonIsLoading}
          />
        </React.Suspense>
      )}

      {createCompletedWorkModalOpened && (
        <React.Suspense
          fallback={<ModalFallback open onCancel={debouncedToggleCreateCompletedWorkModal} />}
        >
          <CreateCompletedWorkModal
            open={createCompletedWorkModalOpened}
            measurementUnits={measurementUnits}
            measurementUnitsIsLoading={measurementUnitsIsFetching}
            onCancel={debouncedToggleCreateCompletedWorkModal}
            onSubmit={onCreateCompletedWork}
            confirmLoading={createCompletedWorkIsLoading}
          />
        </React.Suspense>
      )}
    </>
  )
}

export default CreateDocumentsPackagePage
