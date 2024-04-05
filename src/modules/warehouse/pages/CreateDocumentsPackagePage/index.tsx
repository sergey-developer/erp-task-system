import { useBoolean } from 'ahooks'
import { Button, Col, Flex, Row, Space, Typography } from 'antd'
import get from 'lodash/get'
import React, { FC, useCallback, useState } from 'react'
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
import { DocumentsPackageRelocationEquipmentTableItem } from 'modules/warehouse/components/DocumentsPackageRelocationEquipmentTable/types'
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

import GoBackButton from 'components/Buttons/GoBackButton'
import ModalFallback from 'components/Modals/ModalFallback'
import Spinner from 'components/Spinner'

import { MimetypeEnum } from 'shared/constants/mimetype'
import { useDebounceFn } from 'shared/hooks/useDebounceFn'
import { isBadRequestError, isErrorResponse } from 'shared/services/baseApi'
import { IdType } from 'shared/types/common'
import { MaybeUndefined, Nullable } from 'shared/types/utils'
import { base64ToBytes } from 'shared/utils/common'
import { downloadFile } from 'shared/utils/file'
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
  const task: Nullable<Pick<TaskModel, 'id' | 'recordId'>> = get(location, 'state.task')
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
  const [selectedRelocationEquipment, setSelectedRelocationEquipment] =
    useState<DocumentsPackageRelocationEquipmentTableItem>()

  const [
    createTechnicalExaminationModalOpened,
    {
      setTrue: openCreateTechnicalExaminationModal,
      setFalse: closeCreateTechnicalExaminationModal,
    },
  ] = useBoolean(false)

  const onOpenCreateTechnicalExaminationModal = useDebounceFn(
    (relocationEquipment: DocumentsPackageRelocationEquipmentTableItem) => {
      openCreateTechnicalExaminationModal()
      setSelectedRelocationEquipment(relocationEquipment)
    },
  )
  const onCloseCreateTechnicalExaminationModal = useDebounceFn(() => {
    closeCreateTechnicalExaminationModal()
    setSelectedRelocationEquipment(undefined)
  })

  const { currentData: technicalExamination, isFetching: technicalExaminationIsFetching } =
    useGetRelocationEquipmentTechnicalExamination(
      {
        relocationEquipmentId: selectedRelocationEquipment?.id!,
      },
      { skip: !selectedRelocationEquipment || !createTechnicalExaminationModalOpened },
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

  const [
    createTaskCompletionDocumentsMutation,
    { isLoading: createTaskCompletionDocumentsIsLoading },
  ] = useCreateTaskCompletionDocuments()

  const [
    createRelocationTaskCompletionDocumentsMutation,
    { isLoading: createRelocationTaskCompletionDocumentsIsLoading },
  ] = useCreateRelocationTaskCompletionDocuments()

  const createDocumentsIsLoading =
    createTaskCompletionDocumentsIsLoading || createRelocationTaskCompletionDocumentsIsLoading

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

  const onCreateTechnicalExamination = useCallback<
    CreateTechnicalExaminationModalProps['onSubmit']
  >(
    async (values, setFields) => {
      if (!selectedRelocationEquipment) return

      try {
        await createTechnicalExaminationMutation({
          relocationEquipmentId: selectedRelocationEquipment.id,
          ...values,
        }).unwrap()

        onCloseCreateTechnicalExaminationModal()
      } catch (error) {
        if (isErrorResponse(error) && isBadRequestError(error)) {
          setFields(getFieldsErrors(error.data))
        }
      }
    },
    [
      createTechnicalExaminationMutation,
      onCloseCreateTechnicalExaminationModal,
      selectedRelocationEquipment,
    ],
  )

  const onCreateDocumentsPackage = async () => {
    try {
      let base64: MaybeUndefined<string>
      let fileName: MaybeUndefined<string>

      if (task) {
        base64 = await createTaskCompletionDocumentsMutation({ taskId: task.id }).unwrap()
        fileName = `Пакет документов по инциденту №${task.recordId}`
      } else if (relocationTask) {
        base64 = await createRelocationTaskCompletionDocumentsMutation({
          relocationTaskId: relocationTask.id,
        }).unwrap()
        fileName = `Пакет документов по перемещению №${relocationTask.id}`
      }

      if (base64) downloadFile(base64ToBytes(base64), MimetypeEnum.Pdf, fileName)
    } catch {}
  }

  return (
    <>
      <Flex data-testid='create-documents-package-page' vertical gap='large'>
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
                          disabled={createDocumentsIsLoading}
                        />
                      </React.Suspense>

                      <Button
                        type='link'
                        onClick={debouncedToggleCreateReasonModal}
                        disabled={createDocumentsIsLoading}
                      >
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
                          disabled={createDocumentsIsLoading}
                        />
                      </React.Suspense>

                      <Button
                        type='link'
                        onClick={debouncedToggleCreateCompletedWorkModal}
                        disabled={createDocumentsIsLoading}
                      >
                        Добавить работы
                      </Button>
                    </Flex>
                  </Col>
                </Row>
              )}
            </Flex>

            {taskCompletionDocumentsIsFetching || relocationCompletionDocumentIsFetching ? (
              <Spinner tip='Загрузка перемещений...' />
            ) : (
              (taskCompletionDocuments?.relocationTasks?.length ||
                relocationCompletionDocument) && (
                <Row>
                  <Col span={12}>
                    <Flex vertical gap='middle'>
                      <Title level={4}>Перемещения</Title>

                      {taskCompletionDocuments?.relocationTasks &&
                        taskCompletionDocuments.relocationTasks.map((task) => (
                          <Flex key={task.id} vertical gap='small'>
                            <Title level={5}>
                              {getRelocateFromTo(task, 'Перемещение оборудования')}
                            </Title>

                            <DocumentsPackageRelocationEquipmentTable
                              dataSource={task.relocationEquipments}
                              onClickTechnicalExamination={onOpenCreateTechnicalExaminationModal}
                              disabled={createDocumentsIsLoading}
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
                            disabled={createDocumentsIsLoading}
                          />
                        </Flex>
                      )}
                    </Flex>
                  </Col>
                </Row>
              )
            )}
          </Flex>
        </Flex>

        <Row justify='end'>
          <Col>
            <Space>
              <GoBackButton />

              <Button
                type='primary'
                loading={createDocumentsIsLoading}
                disabled={!task && !relocationTask}
                onClick={onCreateDocumentsPackage}
              >
                Сформировать пакет документов
              </Button>
            </Space>
          </Col>
        </Row>
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
            relocationEquipment={selectedRelocationEquipment}
          />
        </React.Suspense>
      )}
    </>
  )
}

export default CreateDocumentsPackagePage
