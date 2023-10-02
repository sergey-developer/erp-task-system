import { Button, Col, Form, Row, Typography } from 'antd'
import React, { FC } from 'react'

import CreateRelocationTaskForm from 'modules/warehouse/components/CreateRelocationTaskForm'
import RelocationEquipmentEditableTable from 'modules/warehouse/components/RelocationEquipmentEditableTable'

import Space from 'components/Space'

import { CreateRelocationTaskFormFields } from './types'

const { Text } = Typography

const CreateRelocationTaskPage: FC = () => {
  const [form] = Form.useForm<CreateRelocationTaskFormFields>()

  return (
    <Form<CreateRelocationTaskFormFields>
      data-testid='create-relocation-task-page'
      form={form}
      layout='vertical'
      onFinish={(values) => {}}
      initialValues={{
        equipments: [],
      }}
    >
      <Row gutter={[40, 40]}>
        <Col span={24}>
          <CreateRelocationTaskForm />
        </Col>

        <Col span={24}>
          <Space direction='vertical'>
            <Text strong>Перечень оборудования</Text>
            <RelocationEquipmentEditableTable />
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
