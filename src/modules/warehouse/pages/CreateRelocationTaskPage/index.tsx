import { Button, Col, Form, FormProps, Row, Typography } from 'antd'
import React, { FC, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import { useGetUserList } from 'modules/user/hooks'
import RelocationEquipmentEditableTable from 'modules/warehouse/components/RelocationEquipmentEditableTable'
import { RelocationEquipmentRowFields } from 'modules/warehouse/components/RelocationEquipmentEditableTable/types'
import RelocationTaskForm from 'modules/warehouse/components/RelocationTaskForm'
import { LocationOption } from 'modules/warehouse/components/RelocationTaskForm/types'
import { EquipmentCategoryEnum } from 'modules/warehouse/constants/equipment'
import { createRelocationTaskMessages } from 'modules/warehouse/constants/relocationTask'
import { WarehouseRouteEnum } from 'modules/warehouse/constants/routes'
import { useGetEquipmentCatalogList, useLazyGetEquipment } from 'modules/warehouse/hooks/equipment'
import { useCreateRelocationTaskMutation } from 'modules/warehouse/services/relocationTaskApi.service'
import { RelocationTaskFormFields } from 'modules/warehouse/types'
import { getRelocationTaskListPageLink } from 'modules/warehouse/utils/relocationTask'

import Space from 'components/Space'

import { useGetLocationList } from 'shared/hooks/catalogs/location'
import { useGetCurrencyList } from 'shared/hooks/currency'
import {
  isBadRequestError,
  isErrorResponse,
  isForbiddenError,
  isNotFoundError,
} from 'shared/services/baseApi'
import { mergeDateTime } from 'shared/utils/date'
import { getFieldsErrors } from 'shared/utils/form'
import { showErrorNotification } from 'shared/utils/notifications'

const { Text } = Typography

const initialValues: Pick<RelocationTaskFormFields, 'equipments'> = {
  equipments: [],
}

const CreateRelocationTaskPage: FC = () => {
  const navigate = useNavigate()

  const [form] = Form.useForm<RelocationTaskFormFields>()

  const [selectedRelocateFromOption, setSelectedRelocateFromOption] = useState<LocationOption>()

  const { currentData: userList = [], isFetching: userListIsFetching } = useGetUserList({
    isManager: false,
  })

  const { currentData: locationList = [], isFetching: locationListIsFetching } =
    useGetLocationList()

  const { currentData: currencyList = [], isFetching: currencyListIsFetching } =
    useGetCurrencyList()

  const { currentData: equipmentCatalogList = [], isFetching: equipmentCatalogListIsFetching } =
    useGetEquipmentCatalogList(
      {
        locationId: selectedRelocateFromOption?.value,
        locationType: selectedRelocateFromOption?.type,
      },
      { skip: !selectedRelocateFromOption },
    )

  const [getEquipment] = useLazyGetEquipment()

  const [createRelocationTaskMutation, { isLoading: createRelocationTaskIsLoading }] =
    useCreateRelocationTaskMutation()

  const handleCreateRelocationTask = async (values: RelocationTaskFormFields) => {
    try {
      const createdTask = await createRelocationTaskMutation({
        deadlineAt: mergeDateTime(values.deadlineAtDate, values.deadlineAtTime).toISOString(),
        equipments: values.equipments.map((e) => ({
          id: e.id,
          quantity: e.quantity,
          condition: e.condition,
          currency: e.currency,
          price: e.price,
        })),
        relocateToId: values.relocateTo,
        relocateFromId: values.relocateFrom,
        executor: values.executor,
        comment: values.comment,
      }).unwrap()

      navigate(getRelocationTaskListPageLink(createdTask.id))
    } catch (error) {
      if (isErrorResponse(error)) {
        if (isBadRequestError(error)) {
          form.setFields(getFieldsErrors(error.data))

          if (error.data.detail) {
            showErrorNotification(error.data.detail)
          }
        } else if (isForbiddenError(error) && error.data.detail) {
          showErrorNotification(error.data.detail)
        } else if (isNotFoundError(error) && error.data.detail) {
          showErrorNotification(error.data.detail)
        } else {
          showErrorNotification(createRelocationTaskMessages.commonError)
        }
      }
    }
  }

  const handleFormChange: FormProps<RelocationTaskFormFields>['onValuesChange'] = async (
    changedValues,
    values,
  ) => {
    if (changedValues.equipments && !Array.isArray(changedValues.equipments)) {
      const [index, changes] = Object.entries(changedValues.equipments)[0] as [
        string,
        Partial<Omit<RelocationEquipmentRowFields, 'rowId'>>,
      ]

      if (changes.id) {
        const { data: equipment } = await getEquipment({ equipmentId: changes.id })

        if (equipment) {
          const currentEquipment = values.equipments[Number(index)]
          const isConsumable = equipment.category.code === EquipmentCategoryEnum.Consumable

          form.setFieldValue(['equipments', index], {
            ...currentEquipment,
            quantity: isConsumable ? currentEquipment.quantity : 1,
            serialNumber: equipment.serialNumber,
            purpose: equipment.purpose.title,
            condition: equipment.condition,
            amount: equipment.amount,
            price: equipment.price,
            currency: equipment.currency?.id,
            category: equipment.category,
          })
        }
      }
    }
  }

  return (
    <Form<RelocationTaskFormFields>
      data-testid='create-relocation-task-page'
      form={form}
      layout='vertical'
      onFinish={handleCreateRelocationTask}
      onValuesChange={handleFormChange}
      initialValues={initialValues}
    >
      <Row gutter={[40, 40]}>
        <Col span={24}>
          <RelocationTaskForm
            isLoading={createRelocationTaskIsLoading}
            userList={userList}
            userListIsLoading={userListIsFetching}
            locationList={locationList}
            locationListIsLoading={locationListIsFetching}
            onChangeRelocateFrom={setSelectedRelocateFromOption}
          />
        </Col>

        <Col span={24}>
          <Space direction='vertical'>
            <Text strong>Перечень оборудования</Text>

            <RelocationEquipmentEditableTable
              isLoading={createRelocationTaskIsLoading}
              currencyList={currencyList}
              currencyListIsLoading={currencyListIsFetching}
              equipmentCatalogList={equipmentCatalogList}
              equipmentCatalogListIsLoading={equipmentCatalogListIsFetching}
            />
          </Space>
        </Col>

        <Col span={24}>
          <Row justify='end' gutter={8}>
            <Col>
              <Button>
                <Link to={WarehouseRouteEnum.RelocationTaskList}>Отменить</Link>
              </Button>
            </Col>

            <Col>
              <Button type='primary' htmlType='submit' loading={createRelocationTaskIsLoading}>
                Создать заявку
              </Button>
            </Col>
          </Row>
        </Col>
      </Row>
    </Form>
  )
}

export default CreateRelocationTaskPage
