import { useBoolean } from 'ahooks'
import { Button, Col, Flex, Row, Typography } from 'antd'
import get from 'lodash/get'
import React, { FC, useState } from 'react'
import { useLocation } from 'react-router-dom'

import { CreateCallingReasonModalProps } from 'modules/task/components/CreateCallingReasonModal/types'
import { CreateCompletedWorkModalProps } from 'modules/task/components/CreateCompletedWorkModal/types'
import {
  useCreateCompletedWork,
  useCreateInitiationReason,
  useCreateTaskCompletionDocuments,
  useDeleteCompletedWork,
  useDeleteInitiationReason,
  useGetTaskCompletionDocuments,
} from 'modules/task/hooks/task'
import { TaskModel } from 'modules/task/models'
import { CreateTechnicalExaminationModalProps } from 'modules/warehouse/components/CreateTechnicalExaminationModal/types'
import DocumentsPackageRelocationEquipmentTable from 'modules/warehouse/components/DocumentsPackageRelocationEquipmentTable'
import { useGetMeasurementUnitList } from 'modules/warehouse/hooks/measurementUnit'
import {
  useCreateRelocationEquipmentTechnicalExamination,
  useGetRelocationEquipmentTechnicalExamination,
} from 'modules/warehouse/hooks/relocationEquipment'
import {
  useCreateRelocationTaskCompletionDocuments,
  useGetRelocationTaskCompletionDocuments,
} from 'modules/warehouse/hooks/relocationTask'
import { RelocationTaskModel } from 'modules/warehouse/models'
import { getRelocateFromTo } from 'modules/warehouse/utils/relocationTask'

import ModalFallback from 'components/Modals/ModalFallback'
import Spinner from 'components/Spinner'

import { useDebounceFn } from 'shared/hooks/useDebounceFn'
import { isBadRequestError, isErrorResponse } from 'shared/services/baseApi'
import { IdType } from 'shared/types/common'
import { Nullable } from 'shared/types/utils'
import { getFieldsErrors } from 'shared/utils/form'

const CallingReasonsTable = React.lazy(
  () => import('modules/warehouse/components/CallingReasonsTable'),
)
const CreateCallingReasonModal = React.lazy(
  () => import('modules/task/components/CreateCallingReasonModal'),
)

const CompletedWorkTable = React.lazy(
  () => import('modules/warehouse/components/CompletedWorkTable'),
)
const CreateCompletedWorkModal = React.lazy(
  () => import('modules/task/components/CreateCompletedWorkModal'),
)

const CreateTechnicalExaminationModal = React.lazy(
  () => import('modules/warehouse/components/CreateTechnicalExaminationModal'),
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

  // technical examination
  const [selectedRelocationEquipmentId, setSelectedRelocationEquipmentId] = useState<IdType>()

  const [
    createTechnicalExaminationModalOpened,
    {
      setTrue: openCreateTechnicalExaminationModal,
      setFalse: closeCreateTechnicalExaminationModal,
    },
  ] = useBoolean(false)

  const onOpenCreateTechnicalExaminationModal = useDebounceFn((id: IdType) => {
    openCreateTechnicalExaminationModal()
    setSelectedRelocationEquipmentId(id)
  })
  const onCloseCreateTechnicalExaminationModal = useDebounceFn(() => {
    closeCreateTechnicalExaminationModal()
    setSelectedRelocationEquipmentId(undefined)
  })

  const { currentData: technicalExamination, isFetching: technicalExaminationIsFetching } =
    useGetRelocationEquipmentTechnicalExamination(
      {
        relocationEquipmentId: selectedRelocationEquipmentId!,
      },
      { skip: !selectedRelocationEquipmentId || !createTechnicalExaminationModalOpened },
    )

  const [createTechnicalExaminationMutation, { isLoading: createTechnicalExaminationIsLoading }] =
    useCreateRelocationEquipmentTechnicalExamination()

  const { currentData: taskCompletionDocuments, isFetching: taskCompletionDocumentsIsFetching } =
    useGetTaskCompletionDocuments({ taskId: task?.id! }, { skip: !task?.id })

  const {
    currentData: relocationCompletionDocument,
    isFetching: relocationCompletionDocumentIsFetching,
  } = useGetRelocationTaskCompletionDocuments(
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

  const [createTaskCompletionDocumentsMutation, {}] = useCreateTaskCompletionDocuments()

  const [createRelocationTaskCompletionDocumentsMutation, {}] =
    useCreateRelocationTaskCompletionDocuments()

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

  const onCreateTechnicalExamination: CreateTechnicalExaminationModalProps['onSubmit'] = async (
    values,
    setFields,
  ) => {
    if (!selectedRelocationEquipmentId) return

    try {
      await createTechnicalExaminationMutation({
        relocationEquipmentId: selectedRelocationEquipmentId,
        ...values,
      }).unwrap()

      onCloseCreateTechnicalExaminationModal()
    } catch (error) {
      if (isErrorResponse(error) && isBadRequestError(error)) {
        setFields(getFieldsErrors(error.data))
      }
    }
  }

  return (
    <>
      <Flex data-testid='create-documents-package-page' vertical>
        <Flex vertical gap='middle'>
          <Title level={4}>Основные данные о выполненных работах</Title>

          <Flex vertical gap={100}>
            <Flex vertical gap='large'>
              {task && (
                <Row>
                  <Col span={15}>
                    <Flex vertical gap='small' align='start'>
                      <Title level={5}>Причины вызова</Title>

                      <React.Suspense fallback={<Spinner tip='Загрузка таблицы...' />}>
                        <CallingReasonsTable
                          loading={taskCompletionDocumentsIsFetching}
                          dataSource={taskCompletionDocuments?.initiationReasons || []}
                          onDelete={onDeleteInitiationReason}
                        />
                      </React.Suspense>

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

                      <React.Suspense fallback={<Spinner tip='Загрузка таблицы...' />}>
                        <CompletedWorkTable
                          loading={taskCompletionDocumentsIsFetching}
                          dataSource={taskCompletionDocuments?.workList || []}
                          onDelete={onDeleteCompletedWork}
                        />
                      </React.Suspense>

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
                              onClickTechnicalExamination={onOpenCreateTechnicalExaminationModal}
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
                            onClickTechnicalExamination={onOpenCreateTechnicalExaminationModal}
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

      {createTechnicalExaminationModalOpened && (
        <React.Suspense
          fallback={<ModalFallback open onCancel={onCloseCreateTechnicalExaminationModal} />}
        >
          <CreateTechnicalExaminationModal
            open={createTechnicalExaminationModalOpened}
            onCancel={onCloseCreateTechnicalExaminationModal}
            onSubmit={onCreateTechnicalExamination}
            isLoading={createTechnicalExaminationIsLoading}
            technicalExamination={technicalExamination}
            technicalExaminationIsLoading={technicalExaminationIsFetching}
          />
        </React.Suspense>
      )}
    </>
  )
}

export default CreateDocumentsPackagePage
