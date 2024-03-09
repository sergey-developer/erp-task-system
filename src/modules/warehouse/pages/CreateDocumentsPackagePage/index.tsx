import { useBoolean } from 'ahooks'
import { Button, Col, Flex, Row, Typography } from 'antd'
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
import DocumentsPackageRelocationEquipmentTable from 'modules/warehouse/components/DocumentsPackageRelocationEquipmentTable'
import { useGetMeasurementUnitList } from 'modules/warehouse/hooks/measurementUnit'
import { useGetRelocationCompletionDocuments } from 'modules/warehouse/hooks/relocationTask'
import { RelocationTaskModel } from 'modules/warehouse/models'
import { getRelocateFromTo } from 'modules/warehouse/utils/relocationTask'

import ModalFallback from 'components/Modals/ModalFallback'
import Spinner from 'components/Spinner'

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
  const relocationTask: Nullable<Pick<RelocationTaskModel, 'id'>> = get(
    location,
    'state.relocationTask',
  )

  const [createReasonModalOpened, { toggle: toggleCreateReasonModal }] = useBoolean(false)
  const debouncedToggleCreateReasonModal = useDebounceFn(toggleCreateReasonModal)

  const [createCompletedWorkModalOpened, { toggle: toggleCreateCompletedWorkModal }] =
    useBoolean(false)
  const debouncedToggleCreateCompletedWorkModal = useDebounceFn(toggleCreateCompletedWorkModal)

  const { currentData: taskCompletionDocuments, isFetching: taskCompletionDocumentsIsFetching } =
    useGetTaskCompletionDocuments({ taskId: task?.id! }, { skip: !task?.id })

  const {
    currentData: relocationCompletionDocument,
    isFetching: relocationCompletionDocumentIsFetching,
  } = useGetRelocationCompletionDocuments(
    { relocationTaskId: relocationTask?.id! },
    { skip: !relocationTask?.id },
  )

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
        <Flex vertical gap={100}>
          <Flex vertical gap='large'>
            <Title level={4}>Основные данные о выполненных работах</Title>

            {task && (
              <Row>
                <Col span={15}>
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
                </Col>
              </Row>
            )}

            {task && (
              <Row>
                <Col span={10}>
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
                </Col>
              </Row>
            )}
          </Flex>

          <Row>
            <Col span={12}>
              <Flex vertical gap='middle'>
                <Title level={4}>Перемещения</Title>

                {taskCompletionDocumentsIsFetching || relocationCompletionDocumentIsFetching ? (
                  <Spinner />
                ) : (
                  <>
                    {taskCompletionDocuments?.relocationTasks &&
                      taskCompletionDocuments.relocationTasks.map((task) => (
                        <Flex key={task.id} vertical gap='small'>
                          <Title level={5}>
                            {getRelocateFromTo(task, 'Перемещение оборудования')}
                          </Title>

                          <DocumentsPackageRelocationEquipmentTable
                            dataSource={task.relocationEquipments}
                          />
                        </Flex>
                      ))}

                    {relocationCompletionDocument && (
                      <Flex vertical gap='small'>
                        <Title level={5}>
                          {getRelocateFromTo(
                            relocationCompletionDocument,
                            'Перемещение оборудования',
                          )}
                        </Title>

                        <DocumentsPackageRelocationEquipmentTable
                          dataSource={relocationCompletionDocument.relocationEquipments}
                        />
                      </Flex>
                    )}
                  </>
                )}
              </Flex>
            </Col>
          </Row>
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
