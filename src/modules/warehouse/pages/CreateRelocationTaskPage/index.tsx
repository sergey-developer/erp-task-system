import { Button, Col, Form, FormProps, Row, Typography } from 'antd'
import React, { FC, useState } from 'react'

import { useGetUserList } from 'modules/user/hooks'
import CreateRelocationTaskForm from 'modules/warehouse/components/CreateRelocationTaskForm'
import {
  CreateRelocationTaskFormProps,
  LocationOption,
} from 'modules/warehouse/components/CreateRelocationTaskForm/types'
import RelocationEquipmentEditableTable from 'modules/warehouse/components/RelocationEquipmentEditableTable'
import { RelocationEquipmentFormFields } from 'modules/warehouse/components/RelocationEquipmentEditableTable/types'
import { useGetEquipmentCatalogList, useLazyGetEquipment } from 'modules/warehouse/hooks/equipment'

import Space from 'components/Space'

import { useGetLocationList } from 'shared/hooks/catalogs/location'
import { useGetCurrencyList } from 'shared/hooks/currency'

import { CreateRelocationTaskFormFields } from './types'

const { Text } = Typography

const CreateRelocationTaskPage: FC = () => {
  const [form] = Form.useForm<CreateRelocationTaskFormFields>()

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

  const handleChangeRelocateFrom: CreateRelocationTaskFormProps['onChangeRelocateFrom'] = (
    option,
  ) => {
    setSelectedRelocateFromOption(option)
  }

  const handleFormChange: FormProps<CreateRelocationTaskFormFields>['onValuesChange'] = async (
    changedValues,
    values,
  ) => {
    if (changedValues.equipments && !Array.isArray(changedValues.equipments)) {
      const [index, changes] = Object.entries(changedValues.equipments)[0] as [
        string,
        Partial<Omit<RelocationEquipmentFormFields, 'rowId'>>,
      ]

      if (changes.id) {
        const { data: equipment } = await getEquipment({ equipmentId: changes.id })

        if (equipment) {
          const currentEquipment = values.equipments[Number(index)]

          form.setFieldValue(['equipments', index], {
            ...currentEquipment,
            serialNumber: equipment.serialNumber,
            purpose: equipment.purpose.title,
            condition: equipment.condition,
            amount: equipment.amount,
            price: equipment.price,
            currency: equipment.currency?.id,
          })
        }
      }
    }
  }

  return (
    <Form<CreateRelocationTaskFormFields>
      data-testid='create-relocation-task-page'
      form={form}
      layout='vertical'
      onFinish={(values) => {
        console.log({ onFinish: values })
      }}
      onValuesChange={handleFormChange}
      initialValues={{
        equipments: [],
      }}
    >
      <Row gutter={[40, 40]}>
        <Col span={24}>
          <CreateRelocationTaskForm
            userList={userList}
            userListIsLoading={userListIsFetching}
            locationList={locationList}
            locationListIsLoading={locationListIsFetching}
            onChangeRelocateFrom={handleChangeRelocateFrom}
          />
        </Col>

        <Col span={24}>
          <Space direction='vertical'>
            <Text strong>Перечень оборудования</Text>

            <RelocationEquipmentEditableTable
              currencyList={currencyList}
              currencyListIsLoading={currencyListIsFetching}
              equipmentList={equipmentCatalogList}
              equipmentListIsLoading={equipmentCatalogListIsFetching}
            />
          </Space>
        </Col>

        <Col span={24}>
          <Row justify='end' gutter={8}>
            <Col>
              <Button>Отменить</Button>
            </Col>

            <Col>
              <Button type='primary' htmlType='submit' onClick={form?.submit}>
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
