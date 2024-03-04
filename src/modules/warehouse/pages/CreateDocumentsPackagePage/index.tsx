import { Flex, Typography } from 'antd'
import React, { FC } from 'react'
import { useLocation } from 'react-router-dom'

import { useDeleteInitiationReason, useGetTaskCompletionDocuments } from 'modules/task/hooks/task'
import { TaskModel } from 'modules/task/models'
import CallingReasonsTable from 'modules/warehouse/components/CallingReasonsTable'

import { IdType } from 'shared/types/common'
import { MaybeNull } from 'shared/types/utils'

const { Title } = Typography

const CreateDocumentsPackagePage: FC = () => {
  const location = useLocation()
  const task: MaybeNull<Pick<TaskModel, 'id'>> = location.state.task

  const { currentData: taskCompletionDocuments, isFetching: taskCompletionDocumentsIsFetching } =
    useGetTaskCompletionDocuments({ taskId: task!.id }, { skip: !task })

  const [deleteInitiationReasonMutation] = useDeleteInitiationReason()

  const onDeleteInitiationReason = async (id: IdType) => {
    if (!task) return
    await deleteInitiationReasonMutation({ taskId: task.id, id })
  }

  return (
    <Flex data-testid='create-documents-package-page' vertical>
      <Flex vertical gap={112}>
        <Flex vertical gap='large'>
          <Title level={4}>Основные данные о выполненных работах</Title>

          {task && (
            <Flex vertical gap='small'>
              <Title level={5}>Причины вызова</Title>

              <CallingReasonsTable
                loading={taskCompletionDocumentsIsFetching}
                dataSource={taskCompletionDocuments?.initiationReasons || []}
                onDelete={onDeleteInitiationReason}
              />
            </Flex>
          )}
        </Flex>
      </Flex>
    </Flex>
  )
}

export default CreateDocumentsPackagePage
