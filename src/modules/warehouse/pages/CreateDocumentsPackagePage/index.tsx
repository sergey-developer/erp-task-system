import { useBoolean } from 'ahooks'
import { Button, Flex, Typography } from 'antd'
import get from 'lodash/get'
import React, { FC } from 'react'
import { useLocation } from 'react-router-dom'

import { CreateCallingReasonProps } from 'modules/task/components/CreateCallingReason/types'
import {
  useCreateInitiationReason,
  useDeleteCompletedWork,
  useDeleteInitiationReason,
  useGetTaskCompletionDocuments,
} from 'modules/task/hooks/task'
import { TaskModel } from 'modules/task/models'
import CallingReasonsTable from 'modules/warehouse/components/CallingReasonsTable'
import CompletedWorkTable from 'modules/warehouse/components/CompletedWorkTable'

import ModalFallback from 'components/Modals/ModalFallback'

import { useDebounceFn } from 'shared/hooks/useDebounceFn'
import { isBadRequestError, isErrorResponse } from 'shared/services/baseApi'
import { IdType } from 'shared/types/common'
import { Nullable } from 'shared/types/utils'
import { getFieldsErrors } from 'shared/utils/form'

const CreateCallingReason = React.lazy(() => import('modules/task/components/CreateCallingReason'))

const { Title } = Typography

const CreateDocumentsPackagePage: FC = () => {
  const location = useLocation()
  const task: Nullable<Pick<TaskModel, 'id'>> = get(location, 'state.task')

  const [createReasonModalOpened, { toggle: toggleCreateReasonModal }] = useBoolean(false)
  const debouncedToggleCreateReasonModal = useDebounceFn(toggleCreateReasonModal)

  const { currentData: taskCompletionDocuments, isFetching: taskCompletionDocumentsIsFetching } =
    useGetTaskCompletionDocuments({ taskId: task?.id! }, { skip: !task?.id })

  const [createInitiationReasonMutation, { isLoading: createInitiationReasonIsLoading }] =
    useCreateInitiationReason()
  const [deleteInitiationReasonMutation] = useDeleteInitiationReason()

  const [deleteCompletedWorkMutation] = useDeleteCompletedWork()

  const onDeleteInitiationReason = async (id: IdType) => {
    if (!task) return
    await deleteInitiationReasonMutation({ taskId: task.id, id })
  }

  const onDeleteCompletedWork = async (id: IdType) => {
    if (!task) return
    await deleteCompletedWorkMutation({ taskId: task.id, id })
  }

  const onCreateCallingReason: CreateCallingReasonProps['onSubmit'] = async (values, setFields) => {
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
              <Flex vertical gap='small'>
                <Title level={5}>Перечень проведенных работ</Title>

                <CompletedWorkTable
                  loading={taskCompletionDocumentsIsFetching}
                  dataSource={taskCompletionDocuments?.workList || []}
                  onDelete={onDeleteCompletedWork}
                />
              </Flex>
            )}
          </Flex>
        </Flex>
      </Flex>

      {createReasonModalOpened && (
        <React.Suspense
          fallback={<ModalFallback open onCancel={debouncedToggleCreateReasonModal} />}
        >
          <CreateCallingReason
            open={createReasonModalOpened}
            onCancel={debouncedToggleCreateReasonModal}
            onSubmit={onCreateCallingReason}
            confirmLoading={createInitiationReasonIsLoading}
          />
        </React.Suspense>
      )}
    </>
  )
}

export default CreateDocumentsPackagePage
